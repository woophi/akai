import * as mongoose from 'mongoose';
import { SchemaNames } from './types';
const timestamps = require('mongoose-timestamp');

export const YoutubeSchema = new mongoose.Schema(
	{
		url: {
			type: String,
      required: true
    }
  },
	{ collection: SchemaNames.YOUTUBE }
);

YoutubeSchema.plugin(timestamps);

export default mongoose.model(SchemaNames.YOUTUBE, YoutubeSchema, SchemaNames.YOUTUBE);
