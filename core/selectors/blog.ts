import { createSelector } from 'reselect';
import { selectState } from './common';

export const selectAllBlogs = createSelector(
  selectState,
  ui => ui.blogs
);
