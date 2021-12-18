import { callUserApi } from 'core/common';
import { BlogTopItem, ShopOrderItem } from 'core/models';

export const getAdminDashboard = async () => {
  try {
    return Promise.all([
      callUserApi<BlogTopItem[]>('get', 'api/admin/dashboard/topBlogs'),
      callUserApi<ShopOrderItem[]>('get', 'api/admin/dashboard/orders'),
    ]);
  } catch {
    return [];
  }
};
