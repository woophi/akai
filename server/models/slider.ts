import * as mongoose from 'mongoose';
import { SchemaNames } from './types';
const timestamps = require('mongoose-timestamp');

export const SliderSchema = new mongoose.Schema(
	{
		slide: {
      type: mongoose.Schema.Types.ObjectId,
      ref: SchemaNames.FILES
    },
    ordinal: {
      type: Number,
      unique: true
    }
  },
	{ collection: SchemaNames.SLIDER }
);

SliderSchema.plugin(timestamps);

export default mongoose.model(SchemaNames.SLIDER, SliderSchema, SchemaNames.SLIDER);
