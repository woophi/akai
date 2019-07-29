import { store } from 'core/store';
import { getUserToken } from 'core/selectors';
import { callApi } from 'core/common';
import { BlogPreviewItem } from 'core/models';

export const getAllBlogs = async () => {
  try {
    const state = store.getState();
    const data = await callApi<BlogPreviewItem[]>(
      'get',
      'api/admin/blogs',
      null,
      getUserToken(state)
    );
    return data;
  } catch (error) {
    throw error.error;
  }
};
