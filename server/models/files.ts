import mongoose from 'mongoose';
import { File, SchemaNames } from './types';
const timestamps = require('mongoose-timestamp');

export const FilesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
    },
  },
  { collection: SchemaNames.FILES }
);

FilesSchema.plugin(timestamps);

export default mongoose.model<File>(SchemaNames.FILES, FilesSchema);
