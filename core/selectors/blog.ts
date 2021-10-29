import { createSelector } from 'reselect';
import { selectState, getAdminState } from './common';

export const selectAllBlogs = createSelector(selectState, ui => ui.blogs);
export const getAdminAllBlogs = createSelector(getAdminState, admin => admin.blogs || []);
