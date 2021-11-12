import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ShopCategoryInfo, ShopCategoryItem } from 'core/models';

type ShopState = {
  categories: ShopCategoryItem[];
  selectedCategory: ShopCategoryInfo | null;
};

const initialState: ShopState = {
  categories: [],
  selectedCategory: null,
};

const adminShopSlice = createSlice({
  name: 'admin_shop',
  initialState,
  reducers: {
    fetchCategories: (state, a: PayloadAction<ShopCategoryItem[]>) => {
      state.categories = a.payload;
    },
    selectCategory: (state, a: PayloadAction<ShopCategoryInfo>) => {
      state.selectedCategory = a.payload;
    },
  },
});

export const adminShopActions = adminShopSlice.actions;
export const adminShopReducer = adminShopSlice.reducer;
