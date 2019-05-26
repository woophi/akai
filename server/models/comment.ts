import * as mongoose from 'mongoose';
const timestamps = require('mongoose-timestamp');

export const CommentSchema = new mongoose.Schema(
	{
    text: {
      type: String
    },
		deleted: {
			type: Date
		},
		visitor: {
			type: mongoose.Schema.Types.ObjectId,
      ref: 'visitors'
    },
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'blog'
    }
  },
	{ collection: 'comment' }
);

CommentSchema.plugin(timestamps);

export default mongoose.model('comment', CommentSchema, 'comment');
