import { createSelector } from 'reselect';
import { getAdminState } from './common';
import { FileItem } from 'core/models';

export const getSelectedFile = createSelector(
  getAdminState,
  admin => admin.selectedFile || ({} as FileItem)
);
