import { AppState } from 'core/reducers/rootReducer';
import { createSelector } from 'reselect';

export const selectState = (state: AppState) => state.ui;

export const getAdminState = createSelector(selectState, ui => ui.admin);
export const getAdminListsState = createSelector(selectState, ui => ui.admin.lists);

export const getAdminBioData = createSelector(getAdminState, admin => admin.bio);

export const getAdminYoutubes = createSelector(getAdminListsState, lists => lists.youtubes);
