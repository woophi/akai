import * as async from 'async';
import * as mongoose from 'mongoose';
import * as models from '../models/types';

const updatelanguage = (language: models.Language, done) => {
	let payload = {
		name: undefined
	};

  console.log('set', language.name);
  payload.name = language.name + 'new';
	console.log('set new language name', payload.name);
  payload.name = language.name;
  language
		.set(payload)
		.save((err) => {
			if (err)
				console.error('language save error', err);
			console.log('set sucsess');
			done(err);
		});
}

module.exports = (done) => {

	const Language = mongoose.model(models.SchemaNames.LANGUAGE);

	Language
		.find()
		.exec((err, languages) => {

			async.forEach(languages, updatelanguage, done);

		});

}
