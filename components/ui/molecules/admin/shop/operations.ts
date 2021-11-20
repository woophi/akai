import { callUserApi } from 'core/common';
import {
  ShopCategoryInfo,
  ShopCategoryItem,
  ShopCategorySave,
  ShopCategoryUpdate,
  ShopItemInfo,
  ShopItemSave,
  ShopItemUpdate,
} from 'core/models';

export const createShopItem = (data: ShopItemSave) => callUserApi('post', 'api/admin/shop/item', data);
export const getShopItem = (id: string) => callUserApi<ShopItemInfo>('get', `api/admin/shop/items/${id}`);
export const updateShopItem = (data: ShopItemUpdate) => callUserApi('put', 'api/admin/shop/item', data);
export const deleteShopItem = (id: string) => callUserApi('delete', `api/admin/shop/items/${id}`);

export const createShopCategory = (data: ShopCategorySave) => callUserApi('post', 'api/admin/shop/category', data);
export const updateShopCategory = (data: ShopCategoryUpdate) => callUserApi('put', 'api/admin/shop/category', data);
export const getShopCategory = (id: string) => callUserApi<ShopCategoryInfo>('get', `api/admin/shop/categories/${id}`);
export const deleteShopCategory = (id: string) => callUserApi('delete', `api/admin/shop/categories/${id}`);

export const getShopCategories = async () => {
  try {
    const data = await callUserApi<ShopCategoryItem[]>('get', 'api/admin/shop/categories');
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
export const getShopProducts = async () => {
  try {
    const data = await callUserApi<ShopItemInfo[]>('get', 'api/admin/shop/items');
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
