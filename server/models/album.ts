import mongoose from 'mongoose';
import { SchemaNames, Album } from './types';
const timestamps = require('mongoose-timestamp');

export const AlbumSchema = new mongoose.Schema(
  {
    title: [
      {
        localeId: String,
        content: String,
      },
    ],
    coverPhoto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: SchemaNames.FILES,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: SchemaNames.USERS,
    },
    blogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: SchemaNames.BLOG,
      },
    ],
  },
  { collection: SchemaNames.ALBUM }
);

AlbumSchema.plugin(timestamps);

export default mongoose.model<Album>(SchemaNames.ALBUM, AlbumSchema, SchemaNames.ALBUM);
