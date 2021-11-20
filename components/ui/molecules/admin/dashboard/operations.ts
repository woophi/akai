import { callUserApi } from 'core/common';
import { BlogTopItem } from 'core/models';

export const getTopBlogs = async () => {
  try {
    const data = await callUserApi<BlogTopItem[]>('get', 'api/admin/dashboard/topBlogs');
    return data;
  } catch {
    return [];
  }
};
