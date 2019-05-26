import * as mongoose from 'mongoose';
const timestamps = require('mongoose-timestamp');

export const BlogSchema = new mongoose.Schema(
	{
		title: [{
      localeId: String,
      content: String
    }],
    photos: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'files'
    }],
		body: [{
      localeId: String,
      content: String
    }],
		topic: [{
      localeId: String,
      content: String
    }],
    socialShare: {
      localeId: String,
      photoUrl: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'files'
      }
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
      value: String,
      localeId: String
    }],
    comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'comment'
    }]
  },
	{ collection: 'blog' }
);

BlogSchema.plugin(timestamps);

export default mongoose.model('blog', BlogSchema);
