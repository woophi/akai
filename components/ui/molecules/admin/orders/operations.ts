import { callUserApi } from 'core/common';
import { ShopOrderItem } from 'core/models';

export const getOrders = () => callUserApi<ShopOrderItem[]>('get', 'api/admin/orders');
