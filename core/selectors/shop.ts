import { createSelector } from 'reselect';
import { getAdminState } from './common';

const getShopState = createSelector(getAdminState, s => s.shop);

export const getSCategories = createSelector(getShopState, s => s.categories);
export const getSProducts = createSelector(getShopState, s => s.products);
export const getSCategory = createSelector(getShopState, s => s.selectedCategory);
export const getSProduct = createSelector(getShopState, s => s.selectedItem);
