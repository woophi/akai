import mongoose from 'mongoose';
import { SchemaNames, ShopItem } from './types';
const timestamps = require('mongoose-timestamp');

export const ShopItemSchema = new mongoose.Schema(
  {
    title: [
      {
        localeId: String,
        content: String,
      },
    ],
    files: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: SchemaNames.FILES,
      },
    ],
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: SchemaNames.SHOP_CATEGORY,
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
  { collection: SchemaNames.SHOP_ITEMS }
);

ShopItemSchema.plugin(timestamps);

export const ShopItemTable = mongoose.model<ShopItem>(SchemaNames.SHOP_ITEMS, ShopItemSchema, SchemaNames.SHOP_ITEMS);

export default ShopItemTable;
