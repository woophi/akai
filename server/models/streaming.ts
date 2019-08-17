import * as mongoose from 'mongoose';
import { SchemaNames } from './types';
const timestamps = require('mongoose-timestamp');

export const StreamingSchema = new mongoose.Schema(
	{
    chatId: {
      type: String
    }
  },
	{ collection: SchemaNames.STREAMING }
);

StreamingSchema.plugin(timestamps);

export default mongoose.model(SchemaNames.STREAMING, StreamingSchema, SchemaNames.STREAMING);
