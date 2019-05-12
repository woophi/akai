import * as R from 'ramda';
import * as async from 'async';
import * as fs from 'fs';
import * as mongoose from 'mongoose';
import * as path from 'path';
import * as semver from 'semver';
import { createItems } from './createItems';

const _dashes_ = '------------------------------------------------';

const UpdateModel = new mongoose.Schema({
	key: { type: String, index: true },
	appliedOn: { type: Date, default: Date.now },
});
mongoose.model('App_Update', UpdateModel);

export const apply = (callback) => {

	const Update = mongoose.model('App_Update');
	let updateCount = 0;
	let deferCount = 0;
	let skipCount = 0;

  //TODO: check for prodution
  let updatesPath = path.resolve(__dirname, '../../updates');

  console.warn(updatesPath, 'updatesPath');

	const logError = function (...args) {
		for (let i = 0, len = arguments.length; i < len; ++i) {
			process.stderr.write(arguments[i] + '\n');
		}
	};

	const applyUpdate = function (file, done) {
		Update.findOne({ key: file }, function (err, updateRecord) {
			if (err) {
				console.error('Error searching database for update ' + file + ':');
				console.dir(err);
				done(err);
			} else if (!updateRecord) {
        let update = require(path.join(updatesPath, file));
        console.warn(update, 'uupdatePath');

				// skip updates that export a falsy value
				if (!update) {
					skipCount++;
					return done();
				}
				// auto-wrap create scripts for a friendlier shorthand syntax
				if (R.is(Object, update.create)) {
					const items = update.create;
					const ops = update.options || {};
					const background_mode = update.__background__ ? ' (background mode) ' : '';

					update = function (done) {
						createItems(items, ops, function (err, stats) {
							if (!err) {
								var statsMsg = stats ? stats.message : '';

								console.log('\n' + _dashes_,
									'\n' + ': Successfully applied update ' + file + background_mode + '.',
									'\n' + statsMsg,
									'\n');
								done(null);
							}
							else {
								logError('\n' + _dashes_,
									'\n' + ': Update ' + file + background_mode + ' failed with errors:',
									'\n' + err,
									'\n');

								// give the logging some time to finish
								process.nextTick(function () {
									done(err);
								});
							}
						});
					};
				}
				// ensure type
				if (typeof update !== 'function') {
					console.log('\nError in update file ./updates/' + file + '.js\nUpdate files must export a function\n');
					process.exit();
				}
				// if an update is deferred, don't process it
				if (update.__defer__) {
					deferCount++;
					return done();
				}
				// if there are deferred updates, don't process any subsequent ones
				if (deferCount) {
					skipCount++;
					return done();
				}
				console.log(_dashes_ + '\nApplying update ' + file + '...');
				if (update.__background__) {
					updateCount++;
					update(function (err) {
						if (!err) {
							if (update.__commit__ !== false) {
								new Update({ key: file }).save();
							}
						} else {
							done(err);
						}
					});
					done();
				} else {
					update(function (err) {
						if (!err) {
							updateCount++;
							if (update.__commit__ === false) {
								done();
							} else {
								new Update({ key: file }).save(done);
							}
						} else {
							done(err);
						}
					});
				}
			} else {
				done();
			}
		});
	};

	if (!fs.existsSync(updatesPath)) {
		process.exit();
	}

	var updates = fs.readdirSync(updatesPath)
		.map(function (i) {
      // exclude non-javascript or coffee files in the updates folder
      //TODO: check for prodution
			return (path.extname(i) !== '.ts' && path.extname(i) !== '.coffee') ? false : path.basename(i, '.ts');
		}).filter(function (i) {
			// exclude falsy values and filenames that without a valid semver
			return i && semver.valid(i.split('-')[0]);
		}).sort(function (a: string, b: string) {
			// exclude anything after a hyphen from the version number
			return semver.compare(a.split('-')[0], b.split('-')[0]);
    });

  console.warn(updates, 'updates huets');

	async.eachSeries(updates, applyUpdate, function (err) {
		if (updateCount || deferCount || skipCount) {
			var status = '';
			if (updateCount) {
				status += 'Successfully applied ' + updateCount + '* update';
				if (skipCount || deferCount) {
					status += ', ';
				}
			}
			if (deferCount) {
				status += 'Deferred ' + deferCount + '* update';
				if (skipCount) {
					status += ', ';
				}
			}
			if (skipCount) {
				status += 'Skipped ' + skipCount + '* update';
			}
			status += '.';
			console.log(_dashes_ + '\n' + status + '\n' + _dashes_);
		}
		if (err) {
			var errmsg = 'An error occurred applying updates,\n\nError details:';
			if (!(updateCount || deferCount || skipCount)) {
				errmsg = _dashes_ + '\n' + errmsg;
			}
			logError(errmsg);
			logError(err);
			// wait till nextTick to exit so the trace completes.
			process.nextTick(function () {
				process.exit(1);
			});
			return;
		}
		callback && callback();// eslint-disable-line no-unused-expressions
	});
};
