import { callAdminApi } from 'core/common';
import { BlogPreviewItem, FileItem } from 'core/models';
import { store } from 'core/store';

export const getAllBlogs = async () => {
  try {
    const data = await callAdminApi<BlogPreviewItem[]>('get', 'api/admin/blogs');
    store.dispatch({ type: 'FETCH_BLOGS', payload: data });
    return data;
  } catch (error) {
    throw error.error;
  }
};

export const fetchFiles = async () => {
  try {
    const data = await callAdminApi<FileItem[]>('get', 'api/admin/files');
    store.dispatch({ type: 'FETCH_FILES', payload: data });
  } catch (error) {
    return error.error;
  }
};
