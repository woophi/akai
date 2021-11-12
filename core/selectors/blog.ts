import { createSelector } from 'reselect';
import { selectState, getAdminListsState } from './common';

export const selectAllBlogs = createSelector(selectState, ui => ui.blogs);
export const getAdminAllBlogs = createSelector(getAdminListsState, lists => lists.blogs || []);
