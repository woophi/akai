import * as mongoose from 'mongoose';
import { SchemaNames } from './types';
const timestamps = require('mongoose-timestamp');

export const BruteForceSchema = new mongoose.Schema(
	{
    requestId: String,
		data: {
      count: Number,
      lastRequest: Date,
      firstRequest: Date
    },
    expires: {
      type: Date,
      index: {
        expires: "1d"
      }
    }
  },
	{ collection: SchemaNames.BRUTE_FORCE }
);

BruteForceSchema.plugin(timestamps);

export default mongoose.model(SchemaNames.BRUTE_FORCE, BruteForceSchema);
