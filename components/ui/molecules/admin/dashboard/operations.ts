import { callAdminApi } from 'core/common';
import { BlogTopItem } from 'core/models';

export const getTopBlogs = async () => {
  try {
    const data = await callAdminApi<BlogTopItem[]>(
      'get',
      'api/admin/dashboard/topBlogs'
    );
    return data;
  } catch {
    return [];
  }
};
