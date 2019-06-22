import * as mongoose from 'mongoose';
import { SchemaNames } from './types';
const timestamps = require('mongoose-timestamp');

export const BlackListSchema = new mongoose.Schema(
	{
		reason: {
			type: String,
			required: true
		},
		ip: {
			type: String,
      required: true,
      index: true
    },
    level: {
      type: String,
      enum : ['comment','request', 'all'],
      required: true
    },
    visitor: {
			type: mongoose.Schema.Types.ObjectId,
      ref: SchemaNames.VISITORS
    }
  },
	{ collection: SchemaNames.BLACK_LIST }
);

BlackListSchema.plugin(timestamps);
BlackListSchema.index({ ip: 1 });

export default mongoose.model(SchemaNames.BLACK_LIST, BlackListSchema, SchemaNames.BLACK_LIST);
