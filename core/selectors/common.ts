import { createSelector } from 'reselect';
import { AppState } from 'core/models';

export const selectState = (state: AppState) => state.ui;

export const getAdminState = createSelector(
  selectState,
  ui => ui.admin
);

export const getAdminBioData = createSelector(
  getAdminState,
  admin => admin.bio
);
