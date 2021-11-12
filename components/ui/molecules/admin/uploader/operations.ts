import { uploadFiles } from 'core/common';
import { store } from 'core/store';
import { FileItem } from 'core/models';
import { adminFilesActions } from 'core/reducers/admin';
import { AppState } from 'core/reducers/rootReducer';

export const selectFile = (payload: FileItem) => {
  store.dispatch(adminFilesActions.selectFile(payload));
};
export const deselectFile = () => {
  store.dispatch(adminFilesActions.deselectFile());
};

export const uploadFile = async (files: File[]) => {
  store.dispatch(adminFilesActions.deselectFile());
  store.dispatch(adminFilesActions.uploadingFile(true));
  try {
    await uploadFiles(files);
  } catch (error) {
    store.dispatch(adminFilesActions.uploadingFile(false));
  }
};

export const getChosenFile = (fileId: string, state: AppState) => {
  if (!fileId) return {} as FileItem;
  return state.ui.admin.files.list.find(f => f._id == fileId) || ({} as FileItem);
};
