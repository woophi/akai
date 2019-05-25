import * as mongoose from 'mongoose';
const timestamps = require('mongoose-timestamp');

export const SketchBookSchema = new mongoose.Schema(
	{
		name: [{
      language: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'language'
      },
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

export default mongoose.model('sketch_book', SketchBookSchema);
