import { uploadFiles } from 'core/common';
import { store } from 'core/store';
import { FileItem } from 'core/models';
import { adminActions } from 'core/reducers/admin';
import { AppState } from 'core/reducers/rootReducer';

export const selectFile = (payload: FileItem) => {
  store.dispatch(adminActions.selectFile(payload));
};
export const deselectFile = () => {
  store.dispatch(adminActions.deselectFile());
};

export const uploadFile = async (files: File[]) => {
  store.dispatch(adminActions.deselectFile());
  store.dispatch(adminActions.uploadingFile(true));
  try {
    await uploadFiles(files);
  } catch (error) {
    store.dispatch(adminActions.uploadingFile(false));
  }
};

export const getChosenFile = (fileId: string, state: AppState) => {
  if (!fileId) return {} as FileItem;
  return state.ui.admin.files.find(f => f._id == fileId) || ({} as FileItem);
};
