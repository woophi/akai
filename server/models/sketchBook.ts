import * as mongoose from 'mongoose';
import { SchemaNames } from './types';
const timestamps = require('mongoose-timestamp');

export const SketchBookSchema = new mongoose.Schema(
	{
		name: [{
      localeId: String,
      content: String
    }],
		content: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: SchemaNames.FILES
    }]
  },
	{ collection: SchemaNames.SKETCH_BOOK }
);

SketchBookSchema.plugin(timestamps);

export default mongoose.model(SchemaNames.SKETCH_BOOK, SketchBookSchema, SchemaNames.SKETCH_BOOK);
