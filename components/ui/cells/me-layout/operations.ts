import { callUserApi } from 'core/common';
import { ProfileFormModel, UserOrderItem } from 'core/models';

export const updateUserProfile = (data: Omit<ProfileFormModel, 'userId'>) => callUserApi('put', 'api/app/user/me', data);

export const userShopOrders = () => callUserApi<UserOrderItem[]>('get', 'api/app/user/orders');
