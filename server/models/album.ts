import * as mongoose from 'mongoose';
const timestamps = require('mongoose-timestamp');

export const AlbumSchema = new mongoose.Schema(
	{
		title: [{
      language: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'language'
      },
      content: String
    }],
    coverPhoto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'files'
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    },
    albums: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'album'
    }],
    blogs: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'blog'
    }]
  },
	{ collection: 'album' }
);

AlbumSchema.plugin(timestamps);

export default mongoose.model('album', AlbumSchema);
