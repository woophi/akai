import * as mongoose from 'mongoose';
import { SchemaNames } from './types';
const timestamps = require('mongoose-timestamp');

export const SubscribersSchema = new mongoose.Schema(
	{
    email: {
      type: String,
      unique: true
    },
    visitor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: SchemaNames.VISITORS
    }
  },
	{ collection: SchemaNames.SUBS }
);

SubscribersSchema.plugin(timestamps);

export default mongoose.model(SchemaNames.SUBS, SubscribersSchema);
