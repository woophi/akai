import mongoose from 'mongoose';
import { SchemaNames, Subscribers } from './types';
const timestamps = require('mongoose-timestamp');

export const SubscribersSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { collection: SchemaNames.SUBS }
);

SubscribersSchema.plugin(timestamps);

export default mongoose.model<Subscribers>(SchemaNames.SUBS, SubscribersSchema);
