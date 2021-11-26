import { ShopItem } from './shopItems';
import { Model } from './mongoModel';

export type ShopOrder = Model<ShopOrderModel>;

export enum ShopOrderState {
  Open = 'open',
  CheckOut = 'check_out',
  Ordered = 'ordered',
  Paid = 'paid',
  Refund = 'refund',
}

export type ShipAddress = {
  name: string;
  lastName: string;
  companyName?: string;
  country: string;
  streetAddress: string;
  city: string;
  postcode: string;
};
export type BillAddress = ShipAddress & {
  phone: string;
  email: string;
};

export type ShopOrderModel = {
  uniqId: string;
  items: ShopItem[];
  orderState: ShopOrderState;
  finished?: Date;
  paidShipping: boolean;
  notes?: string;
  total: number;
  refundReason: string;
  shipAddress?: ShipAddress;
  billAddress?: BillAddress;
};
