import * as mongoose from 'mongoose';
import { SchemaNames } from './types';
const timestamps = require('mongoose-timestamp');

export const BlogSchema = new mongoose.Schema(
	{
		title: [{
      localeId: String,
      content: String
    }],
    photos: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: SchemaNames.FILES
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
        ref: SchemaNames.FILES
      }
    },
    creationPictureDate: {
      type: Date
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: SchemaNames.USERS
    },
    parameters: [{
      name: String,
      value: String,
      localeId: String
    }],
    comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: SchemaNames.BLOG
    }]
  },
	{ collection: SchemaNames.BLOG }
);

BlogSchema.plugin(timestamps);

export default mongoose.model(SchemaNames.BLOG, BlogSchema, SchemaNames.BLOG);
