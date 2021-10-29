import mongoose from 'mongoose';
import { SchemaNames } from './types';
const timestamps = require('mongoose-timestamp');

export const CommentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
    },
    deleted: {
      type: Date,
    },
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: SchemaNames.BLOG,
    },
  },
  { collection: SchemaNames.COMMENT }
);

CommentSchema.plugin(timestamps);

export default mongoose.model(SchemaNames.COMMENT, CommentSchema, SchemaNames.COMMENT);
