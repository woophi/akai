import mongoose from 'mongoose';
import { SchemaNames, Slider } from './types';
const timestamps = require('mongoose-timestamp');

export const SliderSchema = new mongoose.Schema(
  {
    slide: {
      type: mongoose.Schema.Types.ObjectId,
      ref: SchemaNames.FILES,
    },
    ordinal: {
      type: Number,
    },
  },
  { collection: SchemaNames.SLIDER }
);

SliderSchema.plugin(timestamps);

export default mongoose.model<Slider>(SchemaNames.SLIDER, SliderSchema, SchemaNames.SLIDER);
