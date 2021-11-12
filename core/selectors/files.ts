import { createSelector } from 'reselect';
import { getAdminState, getAdminListsState } from './common';
import { FileItem } from 'core/models';

export const getAdminFilesState = createSelector(getAdminState, admin => admin.files);
export const getSelectedFile = createSelector(getAdminFilesState, f => f.selectedFile || ({} as FileItem));
export const isFileUploading = createSelector(getAdminFilesState, f => f.uploadingFile);
export const getAdminFiles = createSelector(getAdminFilesState, f => f.list);
export const getAdminSlides = createSelector(getAdminListsState, lists => lists.slides);
export const getAdminPhotos = createSelector(getAdminListsState, lists => lists.photos || []);
