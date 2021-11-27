import mongoose from 'mongoose';
import { SchemaNames, TermsAndConditions } from './types';
const timestamps = require('mongoose-timestamp');

export const TermsConditionsSchema = new mongoose.Schema(
  {
    tcText: {
      type: Map,
      of: String,
    },
  },
  { collection: SchemaNames.TERMS_AND_CONDITIONS }
);

TermsConditionsSchema.plugin(timestamps);

export const TermsConditionsTable = mongoose.model<TermsAndConditions>(
  SchemaNames.TERMS_AND_CONDITIONS,
  TermsConditionsSchema,
  SchemaNames.TERMS_AND_CONDITIONS
);

export default TermsConditionsTable;
