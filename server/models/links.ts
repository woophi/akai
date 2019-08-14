import * as mongoose from 'mongoose';
import { SchemaNames } from './types';
const timestamps = require('mongoose-timestamp');

export const LinksSchema = new mongoose.Schema(
	{
    uniqId: String,
    email: String,
    valid: Date
  },
	{ collection: SchemaNames.LINKS }
);

LinksSchema.plugin(timestamps);

export default mongoose.model(SchemaNames.LINKS, LinksSchema);
