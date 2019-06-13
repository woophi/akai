import * as mongoose from 'mongoose';
import { SchemaNames } from './types';
const timestamps = require('mongoose-timestamp');

export const BlogSchema = new mongoose.Schema(
	{
		title: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: SchemaNames.TRANSLATIONS
    }],
    photos: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: SchemaNames.FILES
    }],
		body: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: SchemaNames.TRANSLATIONS
    }],
		topic: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: SchemaNames.TRANSLATIONS
    }],
    socialShare: {
      localeId: String,
      photo: {
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
