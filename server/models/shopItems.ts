import mongoose from 'mongoose';
import { SchemaNames, ShopItem } from './types';
const timestamps = require('mongoose-timestamp');

export const ShopItemSchema = new mongoose.Schema(
  {
    title: {
      type: Map,
      of: String,
    },
    href: {
      type: String,
    },
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
    description: {
      type: Map,
      of: String,
    },
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
        typeOf: String,
      },
    ],
    deleted: {
      type: Date,
      default: null,
    },
  },
  { collection: SchemaNames.SHOP_ITEMS }
);

ShopItemSchema.plugin(timestamps);
ShopItemSchema.index({ href: 1 });

export const ShopItemTable = mongoose.model<ShopItem>(SchemaNames.SHOP_ITEMS, ShopItemSchema, SchemaNames.SHOP_ITEMS);

export default ShopItemTable;
