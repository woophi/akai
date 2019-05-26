import * as mongoose from 'mongoose';
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
    }
  },
	{ collection: 'black_list' }
);

BlackListSchema.plugin(timestamps);
BlackListSchema.index({ ip: 1 });

export default mongoose.model('black_list', BlackListSchema, 'black_list');
