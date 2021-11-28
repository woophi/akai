import { ShopItem } from './shopItems';
import { Model } from './mongoModel';
import { User } from './user';

export type ShopOrder = Model<ShopOrderModel>;

export enum ShopOrderState {
  Open = 'open',
  Ordered = 'ordered',
  Paid = 'paid',
  Shipping = 'shipping',
  Shipped = 'shipped',
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
  user?: User;
  uniqId: string;
  orderId: number;
  items: ShopItem[];
  orderState: ShopOrderState;
  finished?: Date | null;
  paidShipping: boolean;
  notes?: string;
  total: number;
  refundReason: string;
  shipAddress?: ShipAddress;
  billAddress?: BillAddress;
};

export type CreateShopOrder = {
  items: string[];
  paidShipping: boolean;
  notes?: string;
  total: number;
  shipAddress?: ShipAddress;
  billAddress?: BillAddress;
};
