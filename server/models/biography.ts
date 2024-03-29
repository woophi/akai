import mongoose from 'mongoose';
import { SchemaNames, Biography } from './types';
const timestamps = require('mongoose-timestamp');

export const BiographySchema = new mongoose.Schema(
  {
    bio: [
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
  },
  { collection: SchemaNames.BIOGRAPHY }
);

BiographySchema.plugin(timestamps);

export default mongoose.model<Biography>(SchemaNames.BIOGRAPHY, BiographySchema, SchemaNames.BIOGRAPHY);
