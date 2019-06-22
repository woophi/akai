import * as mongoose from 'mongoose';
import { SchemaNames } from './types';
const timestamps = require('mongoose-timestamp');

export const LikesSchema = new mongoose.Schema(
	{
		visitor: {
			type: mongoose.Schema.Types.ObjectId,
      ref: SchemaNames.VISITORS
    }
  },
	{ collection: SchemaNames.LIKES }
);

LikesSchema.plugin(timestamps);

export default mongoose.model(SchemaNames.LIKES, LikesSchema);
