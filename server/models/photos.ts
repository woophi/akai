import mongoose from 'mongoose';
import { Photos, SchemaNames } from './types';
const timestamps = require('mongoose-timestamp');

export const PhotosSchema = new mongoose.Schema(
  {
    file: {
      type: mongoose.Schema.Types.ObjectId,
      ref: SchemaNames.FILES,
    },
    ordinal: {
      type: Number,
    },
  },
  { collection: SchemaNames.PHOTOS }
);

PhotosSchema.plugin(timestamps);

export default mongoose.model<Photos>(SchemaNames.PHOTOS, PhotosSchema);
