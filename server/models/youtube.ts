import mongoose from 'mongoose';
import { SchemaNames, Youtube } from './types';
const timestamps = require('mongoose-timestamp');

export const YoutubeSchema = new mongoose.Schema(
  {
    videoId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
    ordinal: Number,
  },
  { collection: SchemaNames.YOUTUBE }
);

YoutubeSchema.plugin(timestamps);

export default mongoose.model<Youtube>(SchemaNames.YOUTUBE, YoutubeSchema, SchemaNames.YOUTUBE);
