import mongoose from 'mongoose';
import { v4 } from 'uuid';
import { SchemaNames, ShopOrder, ShopOrderState } from './types';
const timestamps = require('mongoose-timestamp');

const ShipAddress = {
  name: String,
  lastName: String,
  companyName: String,
  country: String,
  streetAddress: String,
  city: String,
  postcode: String,
};

const BillAddress = {
  ...ShipAddress,
  phone: String,
  email: String,
};

export const ShopOrderSchema = new mongoose.Schema(
  {
    uniqId: {
      type: String,
      default: v4(),
      index: true,
    },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: SchemaNames.SHOP_ITEMS,
      },
    ],
    orderState: {
      type: String,
      default: ShopOrderState.Open,
      index: true,
    },
    finished: Date,
    paidShipping: Boolean,
    notes: String,
    total: Number,
    shipAddress: ShipAddress,
    billAddress: BillAddress,
    refundReason: String,
  },
  { collection: SchemaNames.SHOP_ORDERS }
);

ShopOrderSchema.plugin(timestamps);

export const ShopOrderTable = mongoose.model<ShopOrder>(SchemaNames.SHOP_ORDERS, ShopOrderSchema, SchemaNames.SHOP_ORDERS);

export default ShopOrderTable;
