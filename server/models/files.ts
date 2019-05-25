import * as mongoose from 'mongoose';
const timestamps = require('mongoose-timestamp');

export const FilesSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		url: {
			type: String,
      required: true
    },
		thumbnail: {
			type: String
    }
  },
	{ collection: 'files' }
);

FilesSchema.plugin(timestamps);

export default mongoose.model('files', FilesSchema);
