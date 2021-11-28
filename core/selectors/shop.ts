import { AddressFormModel, CreateShopOrder } from 'core/models';
import { AppState } from 'core/reducers/rootReducer';
import { createSelector } from 'reselect';
import { getUser } from './user';
import { getAdminState, selectState } from './common';

const getShopState = createSelector(getAdminState, s => s.shop);
const getCustomerShopState = createSelector(selectState, s => s.shop);

export const getSCategories = createSelector(getShopState, s => s.categories);
export const getSProducts = createSelector(getShopState, s => s.products);
export const getSCategory = createSelector(getShopState, s => s.selectedCategory);
export const getSProduct = createSelector(getShopState, s => s.selectedItem);

export const getShopBasketValues = createSelector(getCustomerShopState, s => Object.values(s.basket));
export const getActiveStep = createSelector(getCustomerShopState, s => s.sessionState);
export const isWithShipAddress = createSelector(getCustomerShopState, s => s.withShipAddress);
export const getOrderId = createSelector(getCustomerShopState, s => s.orderId);
export const getShopBasketValuesLength = createSelector(getShopBasketValues, v => v.length);
export const hasBasketItem = createSelector(
  getCustomerShopState,
  (_: AppState, productId: string) => productId,
  (s, pId) => !!s.basket[pId]
);
export const isRemoveItemsDisabled = createSelector(
  getShopBasketValues,
  getOrderId,
  (v, orderId) => v.length === 1 && !!orderId
);

export const getAddressValues = createSelector(
  getCustomerShopState,
  getUser,
  (s, user): AddressFormModel => ({
    billAddress: s.billAddress
      ? s.billAddress
      : user.userId
      ? ({
          email: user.email,
          lastName: user.lastName,
          name: user.name,
        } as AddressFormModel['billAddress'])
      : undefined,

    shipAddress: s.withShipAddress ? s.shipAddress : undefined,
    tandcConfirm: s.tandcConfirm,
    notes: s.notes,
  })
);

export const createShopOrderValues = createSelector(
  getCustomerShopState,
  (s): CreateShopOrder => ({
    items: Object.values(s.basket).map(v => v.id),
    paidShipping: s.paidShipping,
    total: s.total,
    notes: s.notes,
    billAddress: s.billAddress,
    shipAddress: s.shipAddress ?? null,
  })
);
