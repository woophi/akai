import { callAdminApi } from 'core/common';
import { BlogPreviewItem, FileItem } from 'core/models';
import { adminFilesActions, adminListsActions } from 'core/reducers/admin';
import { store } from 'core/store';

export const getAllBlogs = async () => {
  try {
    const data = await callAdminApi<BlogPreviewItem[]>('get', 'api/admin/blogs');
    store.dispatch(adminListsActions.fetchBlogs(data));
    return data;
  } catch (error) {
    throw error.error;
  }
};

export const fetchFiles = async () => {
  try {
    const data = await callAdminApi<FileItem[]>('get', 'api/admin/files');
    store.dispatch(adminFilesActions.fetchFiles(data));
  } catch (error) {
    return error.error;
  }
};
