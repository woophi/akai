import * as mongoose from 'mongoose';
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
	{ collection: 'facebook_pages' }
);

FacebookPagesSchema.plugin(timestamps);
FacebookPagesSchema.index({ pageId: 1 });

export default mongoose.model('facebook_pages', FacebookPagesSchema);
