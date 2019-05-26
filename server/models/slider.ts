import * as mongoose from 'mongoose';
const timestamps = require('mongoose-timestamp');

export const SliderSchema = new mongoose.Schema(
	{
		slide: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'files'
    },
    ordinal: {
      type: Number,
      unique: true
    }
  },
	{ collection: 'slider' }
);

SliderSchema.plugin(timestamps);

export default mongoose.model('slider', SliderSchema, 'slider');
