import * as R from 'ramda';
import * as async from 'async';
import { Logger } from '../../logger';

var MONGO_ID_REGEXP = /^[0-9a-fA-F]{8}[0-9a-fA-F]{6}[0-9a-fA-F]{4}[0-9a-fA-F]{6}$/;

function isMongoId (value) {
	return MONGO_ID_REGEXP.test(value);
}

export function createItems (data, ops, callback) {

	var kmPIZDEC = this;
	var options: any = {
		verbose: false,
		strict: true,
		refs: null,
	};

	var dashes = '------------------------------------------------';

	if (!R.is(Object, data)) {
		throw new Error('createItems() requires a data object as the first argument.');
	}

	if (R.is(Object, ops)) {
		R.mergeWith(options, ops);
	}

	if (typeof ops === 'function') {
		callback = ops;
	}

	var lists = R.keys(data);
	var refs = options.refs || {};
	var stats: any = {};

	// logger function
	function writeLog (data) {
		console.log(': ' + data);
	}

	async.waterfall([

		// create items
		function (next) {
			async.eachSeries(lists, function (key: string, doneList) {
        console.warn(key, 'key suka');
				var list = kmPIZDEC.list(key);
				var relationshipPaths = R.filter((it: any) => it.type === 'relationship', list.fields).map(function (i) { return i.path; });

				if (!list) {
					if (options.strict) {
						return doneList(
							Error('List key ' + key + ' is invalid.')
						);
					}
					if (options.verbose) {
						writeLog('Skipping invalid list: ' + key);
					}
					return doneList();
				}

				if (!refs[list.key]) {
					refs[list.key] = {};
				}

				stats[list.key] = {
					singular: list.singular,
					plural: list.plural,
					created: 0,
					warnings: 0,
				};

				var itemsProcessed = 0;
				var totalItems = data[key].length;

				if (options.verbose) {
					writeLog(dashes);
					writeLog('Processing list: ' + key);
					writeLog('Items to create: ' + totalItems);
					writeLog(dashes);
				}

				async.eachSeries(data[key], function (data: any, doneItem) {

					itemsProcessed++;

					// Evaluate function properties to allow generated values (excluding relationships)
					R.keys(data).forEach(function (i: string) {
						if (typeof data[i] === 'function' && relationshipPaths.indexOf(i) === -1) {
							data[i] = data[i]();
							if (options.verbose) {
								writeLog('Generated dynamic value for [' + i + ']: ' + data[i]);
							}
						}
					});

					var doc = data.__doc = new list.model();

					if (data.__ref) {
						refs[list.key][data.__ref] = doc;
					}

					async.each(list.fieldsArray, function (field: any, doneField) {
						// skip relationship fields on the first pass.
						if (field.type !== 'relationship') {
							field.updateItem(doc, data, doneField);
						} else {
							doneField();
						}
					}, function (err) {
						if (!err) {
							if (options.verbose) {
								var documentName = list.getDocumentName(doc);
								writeLog('Creating item [' + itemsProcessed + ' of ' + totalItems + '] - ' + documentName);
							}

							doc.save(function (err) {
								if (err) {
									err.model = key;
									err.data = data;
									Logger.error('error saving '+ key);
								} else {
									stats[list.key].created++;
								}
								doneItem(err);
							});
						} else {
							doneItem(err);
						}
					});
				}, doneList);

			}, next);
		},

		// link items
		function (next) {

			async.each(lists, function (key: string, doneList) {

				var list = kmPIZDEC.list(key);
				var relationships = R.filter((it: any) => it.type === 'relationship', list.fields);

				if (!list || !relationships.length) {
					return doneList();
				}

				var itemsProcessed = 0;
				var totalItems = data[key].length;

				if (options.verbose) {
					writeLog(dashes);
					writeLog('Processing relationships for: ' + key);
					writeLog('Items to process: ' + totalItems);
					writeLog(dashes);
				}

				async.each(data[key], function (srcData: any, doneItem) {

					var doc = srcData.__doc;
					var relationshipsUpdated = 0;

					itemsProcessed++;

					if (options.verbose) {
						var documentName = list.getDocumentName(doc);
						writeLog('Processing item [' + itemsProcessed + ' of ' + totalItems + '] - ' + documentName);
					}

					async.each(relationships, function (field, doneField) {

						var fieldValue = null;
						var refsLookup = null;

						if (!field.path) {
							writeLog('WARNING:  Invalid relationship (undefined list path) [List: ' + key + ']');
							stats[list.key].warnings++;
							return doneField();
						} else {
							fieldValue = srcData[field.path];
						}

						if (!field.refList) {
							if (fieldValue) {
								writeLog('WARNING:  Invalid relationship (undefined reference list) [list: ' + key + '] [path: ' + fieldValue + ']');
								stats[list.key].warnings++;
							}
							return doneField();
						}

						if (!field.refList.key) {
							writeLog('WARNING:  Invalid relationship (undefined ref list key) [list: ' + key + '] [field.refList: ' + field.refList + '] [fieldValue: ' + fieldValue + ']');
							stats[list.key].warnings++;
							return doneField();
						} else {
							refsLookup = refs[field.refList.key];
						}

						if (!fieldValue) {
							return doneField();
						}

						// populate relationships from saved refs
						if (typeof fieldValue === 'function') {

							relationshipsUpdated++;

							var fn = fieldValue;
							var argsRegExp = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
							var lists = fn.toString().match(argsRegExp)[1].split(',').map(function (i) { return i.trim(); });
							var args = lists.map(function (i) {
								return kmPIZDEC.list(i);
							});
							var query = fn.apply(kmPIZDEC, args);

							query.exec(function (err, results) {
								if (err) { Logger.error('error ' + err); }
								if (field.many) {
									doc.set(field.path, results || []);
								} else {
									doc.set(field.path, (results && results.length) ? results[0] : undefined);
								}
								doneField(err);
							});

						} else if (R.is(Array, fieldValue)) {

							if (field.many) {

								var refsArr = R.filter(it => !!it, fieldValue.map(function (ref) {
									return isMongoId(ref) ? ref : refsLookup && refsLookup[ref] && refsLookup[ref].id;
								}));

								if (options.strict && refsArr.length !== fieldValue.length) {
									return doneField(Error(
										'Relationship ' + list.key + '.' + field.path + ' contains an invalid reference.',
									));
								}

								relationshipsUpdated++;
								doc.set(field.path, refsArr);
								doneField();

							} else {
								return doneField(Error(
									'Single-value relationship ' + list.key + '.' + field.path + ' provided as an array.',
								));
							}

						} else if (typeof fieldValue === 'string') {

							var refItem = isMongoId(fieldValue) ? fieldValue : refsLookup && refsLookup[fieldValue] && refsLookup[fieldValue].id;

							if (!refItem) {
								return options.strict ? doneField({
									type: 'invalid ref',
									srcData: srcData,
									message: 'Relationship ' + list.key + '.' + field.path + ' contains an invalid reference: "' + fieldValue + '".',
								} as any) : doneField();
							}

							relationshipsUpdated++;

							doc.set(field.path, field.many ? [refItem] : refItem);

							doneField();

						} else if (fieldValue && fieldValue.id) {

							relationshipsUpdated++;
							doc.set(field.path, field.many ? [fieldValue.id] : fieldValue.id);
							doneField();

						} else {
							return doneField({
								type: 'invalid data',
								srcData: srcData,
								message: 'Relationship ' + list.key + '.' + field.path + ' contains an invalid data type.',
							} as any);
						}

					}, function (err) {
						if (err) {
							Logger.error('error ' + err);
							return doneItem(err);
						}
						if (options.verbose) {
							writeLog('Populated ' + relationshipsUpdated + '* relationship' + '* relationships' + '.');
						}
						if (relationshipsUpdated) {
							doc.save(doneItem);
						} else {
							doneItem();
						}
					});

				}, doneList);

			}, next);
		},

	], function (err) {

		if (err) {
			console.error(err);
			if ('stack' in err) {
				console.trace(err.stack);
			}
			return callback && callback(err);
		}

		var msg = '\nSuccessfully created:\n';
		R.forEachObjIndexed(function (list: any) {
			msg += '\n*   ' + list.created + '* ' + list.singular + '* ' + list.plural;
			if (list.warnings) {
				msg += '\n    ' + list.warnings + '* warnings';
			}
		}, stats);
		stats.message = msg + '\n';

		callback(null, stats);
	});
}