import mongoose from 'mongoose';
import { SchemaNames } from './types';
const timestamps = require('mongoose-timestamp');

export const VisitorsSchema = new mongoose.Schema(
	{
		visitorId: {
			type: String,
			lowercase: true,
			trim: true,
			index: true,
			unique: true,
			required: true
		},
		uniqVisits: {
			type: Number,
			required: true
		},
		lastVisit: {
			type: String,
			required: true
		},
		visitInfo: {
      device: {
        type: Object
      },
      language: {
        type: String,
			  lowercase: true
      },
      city: {
        type: String,
			  lowercase: true
      },
      country: {
        type: String,
			  lowercase: true
      },
      browser: {
        type: Object
      },
      os: {
        type: Object
      },
      ip: {
        type: String,
			  lowercase: true
      }
    },
    name: {
      type: String
    },
    savedLocaleId: {
      type: String
    },
    comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: SchemaNames.COMMENT
    }]
	},
	{ collection: SchemaNames.VISITORS }
);

VisitorsSchema.plugin(timestamps);

VisitorsSchema.index({ visitorId: 1 });

export default mongoose.model(SchemaNames.VISITORS, VisitorsSchema);
