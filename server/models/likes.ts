import mongoose from 'mongoose';
import { SchemaNames } from './types';
const timestamps = require('mongoose-timestamp');

export const LikesSchema = new mongoose.Schema(
  {
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: SchemaNames.BLOG,
    },
  },
  { collection: SchemaNames.LIKES }
);

LikesSchema.plugin(timestamps);

export default mongoose.model(SchemaNames.LIKES, LikesSchema);
