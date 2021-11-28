import { FileItem } from './admin/files';

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

export type ProductInBasket = {
  id: string;
  price: number;
  name: string;
  file: FileItem;
  href: string;
};
export enum CustomerSessionState {
  Open = 'open',
  CheckOut = 'check_out',
  Ordered = 'ordered',
  Paid = 'paid',
  Refund = 'refund',
}

export type ShopState = {
  basket: {
    [productId: string]: ProductInBasket;
  };
  sessionState: CustomerSessionState;
  paidShipping: boolean;
  notes?: string;
  total: number;
  shipAddress?: ShipAddress;
  billAddress?: BillAddress;

  withShipAddress: boolean;
  tandcConfirm?: boolean;

  orderId: number;
};

export type AddressFormModel = {
  shipAddress?: ShipAddress;
  billAddress?: BillAddress;
  tandcConfirm?: boolean;
  notes?: string;
};

export type CreateShopOrder = {
  items: string[];
  paidShipping: boolean;
  notes?: string;
  total: number;
  shipAddress?: ShipAddress | null;
  billAddress?: BillAddress;
};
export type UpdateShopOrder = CreateShopOrder & {
  orderId: number;
};
