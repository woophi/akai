import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateProps } from 'core/lib';
import { FileItem } from 'core/models';

type ProductInBasket = {
  id: string;
  price: number;
  name: string;
  file: FileItem;
  href: string;
};
enum CustomerSessionState {
  Open = 'open',
  CheckOut = 'check_out',
  Ordered = 'ordered',
  Paid = 'paid',
}

type ShopState = {
  basket: {
    [productId: string]: ProductInBasket;
  };
  sessionState: CustomerSessionState;
};

const initialState: ShopState = {
  sessionState: CustomerSessionState.Open,
  basket: {},
};

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
    },
    removeProduct: (state, a: PayloadAction<string>) => {
      delete state.basket[a.payload];
    },
    changeSessionState: (state, a: PayloadAction<CustomerSessionState>) => {
      state.sessionState = a.payload;
    },
  },
});

export const shopActions = shopSlice.actions;
export const shopReducer = shopSlice.reducer;
