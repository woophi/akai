import * as mongoose from 'mongoose';
const timestamps = require('mongoose-timestamp');

export const SketchBookSchema = new mongoose.Schema(
	{
		name: [{
      localeId: String,
      content: String
    }],
		content: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'files'
    }]
  },
	{ collection: 'sketch_book' }
);

SketchBookSchema.plugin(timestamps);

export default mongoose.model('sketch_book', SketchBookSchema, 'sketch_book');
