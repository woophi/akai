import { createSelector } from 'reselect';
import { AppState } from 'core/models';

export const selectState = (state: AppState) => state.ui

export const selectCount = createSelector(
  selectState,
  count => count.count
)

export const selectLight =  createSelector(
  selectState,
  count => count.light
)

export const selectLastUpdate =  createSelector(
  selectState,
  count => count.lastUpdate
)
