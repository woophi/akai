import { createSelector } from 'reselect';
import { getAdminState } from './common';

const getShopState = createSelector(getAdminState, s => s.shop);

export const getSCategories = createSelector(getShopState, s => s.categories);
export const getSCategory = createSelector(getShopState, s => s.selectedCategory);
