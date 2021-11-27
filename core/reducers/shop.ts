import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { objKeys, updateProps } from 'core/lib';
import { LS } from 'core/LS';
import { AddressFormModel, CustomerSessionState, ProductInBasket } from 'core/models';

const initialState = LS.getItem(LS.keys.Basket, {
  sessionState: CustomerSessionState.Open,
  basket: {},
  total: 0,
  paidShipping: false,
  withShipAddress: false,
  orderId: 0,
});

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    addProduct: (state, a: PayloadAction<ProductInBasket>) => {
      if (!state.basket[a.payload.id]) {
        state.basket[a.payload.id] = a.payload;
      } else {
        updateProps(state.basket[a.payload.id], a.payload);
      }
      state.total = objKeys(state.basket).reduce<number>((sum, pId) => (sum += state.basket[pId].price), 0);

      LS.setItem(LS.keys.Basket, state);
    },
    removeProduct: (state, a: PayloadAction<string>) => {
      delete state.basket[a.payload];
      state.total = objKeys(state.basket).reduce<number>((sum, pId) => (sum += state.basket[pId].price), 0);

      LS.setItem(LS.keys.Basket, state);
    },
    changeSessionState: (state, a: PayloadAction<CustomerSessionState>) => {
      state.sessionState = a.payload;
      LS.setItem(LS.keys.Basket, state);
    },
    changeShipping: (state, a: PayloadAction<boolean>) => {
      state.paidShipping = a.payload;
      state.total = a.payload ? (state.total += 200) : (state.total -= 200);

      LS.setItem(LS.keys.Basket, state);
    },
    changeWithShipAddress: (state, a: PayloadAction<boolean>) => {
      state.withShipAddress = a.payload;
      LS.setItem(LS.keys.Basket, state);
    },
    setAddress: (state, a: PayloadAction<AddressFormModel & { orderId: number }>) => {
      if (!state.billAddress) {
        state.billAddress = {} as AddressFormModel['billAddress'];
      }
      updateProps(state.billAddress, a.payload.billAddress);

      if (state.withShipAddress) {
        if (!state.shipAddress) {
          state.shipAddress = {} as AddressFormModel['shipAddress'];
        }
        updateProps(state.shipAddress, a.payload.shipAddress);
      }

      state.tandcConfirm = a.payload.tandcConfirm;
      state.orderId = a.payload.orderId;
      LS.setItem(LS.keys.Basket, state);
    },
    resetToDefault: state => {
      LS.deleteItem(LS.keys.Basket);
      return {
        sessionState: state.sessionState,
        basket: {},
        total: 0,
        paidShipping: false,
        withShipAddress: false,
        orderId: 0,
      };
    },
  },
});

export const shopActions = shopSlice.actions;
export const shopReducer = shopSlice.reducer;
