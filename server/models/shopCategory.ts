import mongoose from 'mongoose';
import { SchemaNames, ShopCategory } from './types';
const timestamps = require('mongoose-timestamp');

export const ShopCategorySchema = new mongoose.Schema(
  {
    title: [
      {
        localeId: String,
        content: String,
      },
    ],
    shopItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: SchemaNames.SHOP_ITEMS,
      },
    ],
    description: [
      {
        localeId: String,
        content: String,
      },
    ],
    price: {
      type: Number,
    },
    stock: {
      type: Number,
    },
    parameters: [
      {
        name: String,
        value: String,
        localeId: String,
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
