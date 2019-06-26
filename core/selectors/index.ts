import { createSelector } from 'reselect';
import { AppState } from 'core/models';

export const selectState = (state: AppState) => state.ui

export const selectAllBlogs = createSelector(
  selectState,
  ui => ui.blogs
);
