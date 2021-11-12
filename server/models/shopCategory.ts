import mongoose from 'mongoose';
import { SchemaNames, ShopCategory } from './types';
const timestamps = require('mongoose-timestamp');

export const ShopCategorySchema = new mongoose.Schema(
  {
    name: {
      type: Map,
      of: String,
    },
    shopItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: SchemaNames.SHOP_ITEMS,
      },
    ],
    deleted: {
      type: Date,
    },
  },
  { collection: SchemaNames.SHOP_CATEGORY }
);

ShopCategorySchema.plugin(timestamps);

export const ShopCategoryTable = mongoose.model<ShopCategory>(
  SchemaNames.SHOP_CATEGORY,
  ShopCategorySchema,
  SchemaNames.SHOP_CATEGORY
);

export default ShopCategoryTable;
