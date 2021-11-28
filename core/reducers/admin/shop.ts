import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ShopCategoryInfo, ShopCategoryItem, ShopItemInfo, ShopOrderModel } from 'core/models';

type ShopState = {
  categories: ShopCategoryItem[];
  products: ShopItemInfo[];
  selectedCategory: ShopCategoryInfo | null;
  selectedItem: ShopItemInfo | null;
  selectedOrder: ShopOrderModel | null;
};

const initialState: ShopState = {
  categories: [],
  products: [],
  selectedCategory: null,
  selectedItem: null,
  selectedOrder: null,
};

const adminShopSlice = createSlice({
  name: 'admin_shop',
  initialState,
  reducers: {
    fetchCategories: (state, a: PayloadAction<ShopCategoryItem[]>) => {
      state.categories = a.payload;
    },
    fetchProducts: (state, a: PayloadAction<ShopItemInfo[]>) => {
      state.products = a.payload;
    },
    selectCategory: (state, a: PayloadAction<ShopCategoryInfo>) => {
      state.selectedCategory = a.payload;
    },
    selectItem: (state, a: PayloadAction<ShopItemInfo>) => {
      state.selectedItem = a.payload;
    },
    selectOrder: (state, a: PayloadAction<ShopOrderModel>) => {
      state.selectedOrder = a.payload;
    },
  },
});

export const adminShopActions = adminShopSlice.actions;
export const adminShopReducer = adminShopSlice.reducer;
