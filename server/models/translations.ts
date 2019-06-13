import * as mongoose from 'mongoose';
import { SchemaNames } from './types';
const timestamps = require('mongoose-timestamp');

// TODO: define save models through types;

export const TranslationsSchema = new mongoose.Schema(
	{
    language: {
      type: mongoose.Schema.Types.ObjectId,
      ref: SchemaNames.LANGUAGE
    },
    any: String
  },
	{ collection: SchemaNames.TRANSLATIONS }
);

TranslationsSchema.plugin(timestamps);

export default mongoose.model(SchemaNames.TRANSLATIONS, TranslationsSchema);
