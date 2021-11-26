import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { objKeys, updateProps } from 'core/lib';
import { LS } from 'core/LS';
import { CustomerSessionState, ProductInBasket } from 'core/models';

const initialState = LS.getItem(LS.keys.Basket, {
  sessionState: CustomerSessionState.Open,
  basket: {},
  total: 0,
  paidShipping: false,
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
  },
});

export const shopActions = shopSlice.actions;
export const shopReducer = shopSlice.reducer;
