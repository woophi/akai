import { AppState } from 'core/reducers/rootReducer';
import { createSelector } from 'reselect';
import { getAdminState, selectState } from './common';

const getShopState = createSelector(getAdminState, s => s.shop);
const getCustomerShopState = createSelector(selectState, s => s.shop);

export const getSCategories = createSelector(getShopState, s => s.categories);
export const getSProducts = createSelector(getShopState, s => s.products);
export const getSCategory = createSelector(getShopState, s => s.selectedCategory);
export const getSProduct = createSelector(getShopState, s => s.selectedItem);

export const getShopBasketValuesLength = createSelector(getCustomerShopState, s => Object.values(s.basket).length);
export const hasBasketItem = createSelector(
  getCustomerShopState,
  (_: AppState, productId: string) => productId,
  (s, pId) => !!s.basket[pId]
);
