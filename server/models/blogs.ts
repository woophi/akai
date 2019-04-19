import * as mongoose from 'mongoose';
const timestamps = require('mongoose-timestamp');

export const BlogsSchema = new mongoose.Schema(
	{
    uniqIdentifier: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true
    },
		title: {
			type: String,
			index: true,
			required: true
		},
		body: {
			type: String,
			required: true
    }
  },
	{ collection: 'blogs' }
);

BlogsSchema.plugin(timestamps);
BlogsSchema.index({ title: 1 });

export default mongoose.model('Blogs', BlogsSchema);
