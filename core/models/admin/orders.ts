export enum ShopOrderState {
  Open = 'open',
  Ordered = 'ordered',
  Paid = 'paid',
  Refund = 'refund',
}

export type OrderShipAddress = {
  name: string;
  lastName: string;
  companyName?: string;
  country: string;
  streetAddress: string;
  city: string;
  postcode: string;
};
export type OrderBillAddress = OrderShipAddress & {
  phone: string;
  email: string;
};

export type OrderItem = {
  _id: string;
  url: string;
  title: string;
  price: number;
  stock: number;
};

export type ShopOrderModel = {
  orderId: number;
  items: OrderItem[];
  orderState: ShopOrderState;
  finished?: Date | null;
  paidShipping: boolean;
  notes?: string;
  total: number;
  refundReason: string;
  shipAddress?: OrderShipAddress;
  billAddress?: OrderBillAddress;
};

export type ShopOrderItem = {
  orderId: number;
  orderState: ShopOrderState;
  total: number;
  email: string;
  name: string;
};
