import { createSelector } from 'reselect';
import { getAdminState } from './common';
import { FileItem } from 'core/models';

export const getSelectedFile = createSelector(getAdminState, admin => admin.selectedFile || ({} as FileItem));
export const getAdminFiles = createSelector(getAdminState, admin => admin.files);
export const getAdminSlides = createSelector(getAdminState, admin => admin.slides);
export const getAdminPhotos = createSelector(getAdminState, admin => admin.photos || []);
