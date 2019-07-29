import { callApi, uploadFiles } from 'core/common';
import { store } from 'core/store';
import { getUserToken } from 'core/selectors';
import { FileItem } from 'core/models';

export const fetchFiles = async () => {
  try {
    const state = store.getState();
    const data = await callApi<FileItem[]>(
      'get',
      'api/admin/files',
      null,
      getUserToken(state)
    );
    store.dispatch({ type: 'FETCH_FILES', payload: data });
  } catch (error) {
    return error.error;
  }
};
export const selectFile = (payload: FileItem) => {
  store.dispatch({ type: 'SELECT_FILE', payload });
};
export const deselectFile = () => {
  store.dispatch({ type: 'SELECT_FILE', payload: null });
};

export const uploadFile = async (files: File[]) => {
  store.dispatch({ type: 'SELECT_FILE', payload: null });
  store.dispatch({ type: 'UPLOADING_FILE', payload: true });
  try {
    await uploadFiles(files);
  } catch (error) {
    store.dispatch({ type: 'UPLOADING_FILE', payload: false });
  }
};

export const getChosenFile = (fileId: string) => {
  if (!fileId) return {} as FileItem;
  return (
    store.getState().ui.admin.files.find(f => f._id == fileId) || ({} as FileItem)
  );
};
