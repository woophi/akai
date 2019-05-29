import * as mongoose from 'mongoose';
import { SchemaNames } from './types';
const timestamps = require('mongoose-timestamp');

export const FacebookPagesSchema = new mongoose.Schema(
	{
    pageId: {
      type: Number,
      unique: true,
      index: true
    },
		pageName: {
			type: String,
			required: true
		},
		longLiveToken: {
			type: String,
			required: true
    }
  },
	{ collection: SchemaNames.FB_PAGES }
);

FacebookPagesSchema.plugin(timestamps);
FacebookPagesSchema.index({ pageId: 1 });

export default mongoose.model(SchemaNames.FB_PAGES, FacebookPagesSchema);
