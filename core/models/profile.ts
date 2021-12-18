import { ShopOrderItem } from '.';

export type ProfileFormModel = {
  name: string;
  lastName: string;
  email: string;
  userId: string;
};

export type UserOrderItem = ShopOrderItem & {
  uniqId: string;
};
