import * as mongoose from 'mongoose';
const timestamps = require('mongoose-timestamp');

const language = {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'language'
};

export const BlogSchema = new mongoose.Schema(
	{
		title: [{
      language,
      content: String
    }],
    photos: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'files'
    }],
		body: [{
      language,
      content: String
    }],
		topic: [{
      language,
      content: String
    }],
    socialShare: {
      language,
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
      language
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
