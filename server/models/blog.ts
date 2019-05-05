import * as mongoose from 'mongoose';
const timestamps = require('mongoose-timestamp');

export const BlogSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			index: true,
			required: true
    },
    photos: [{
      name: String,
      url: String,
      thumbnail: String
    }],
		body: {
			type: String
    },
    creationPictureDate: {
      type: Date
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    },
    parameters: [{
      name: String,
      value: String
    }],
    comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'comment'
    }]
  },
	{ collection: 'blog' }
);

BlogSchema.plugin(timestamps);
BlogSchema.index({ title: 1 });

export default mongoose.model('blog', BlogSchema);
