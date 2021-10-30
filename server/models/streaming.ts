import mongoose from 'mongoose';
import { SchemaNames, Streaming } from './types';
const timestamps = require('mongoose-timestamp');

export const StreamingSchema = new mongoose.Schema(
  {
    chatId: {
      type: String,
    },
  },
  { collection: SchemaNames.STREAMING }
);

StreamingSchema.plugin(timestamps);

export default mongoose.model<Streaming>(SchemaNames.STREAMING, StreamingSchema, SchemaNames.STREAMING);
