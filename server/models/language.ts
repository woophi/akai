import * as mongoose from 'mongoose';
const timestamps = require('mongoose-timestamp');

export const LanguageSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		localeId: {
			type: String,
      required: true,
      index: true,
      unique: true
    },
    deleted: {
      type: Date,
    }
  },
	{ collection: 'language' }
);

LanguageSchema.plugin(timestamps);
LanguageSchema.index({ localeId: 1 });

export default mongoose.model('language', LanguageSchema, 'language');
