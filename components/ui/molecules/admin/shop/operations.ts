import { callAdminApi } from 'core/common';
import {
  ShopCategoryInfo,
  ShopCategoryItem,
  ShopCategorySave,
  ShopCategoryUpdate,
  ShopItemInfo,
  ShopItemSave,
  ShopItemUpdate,
} from 'core/models';

export const createShopItem = (data: ShopItemSave) => callAdminApi('post', 'api/admin/shop/item', data);
export const getShopItem = (id: string) => callAdminApi<ShopItemInfo>('get', `api/admin/shop/items/${id}`);
export const updateShopItem = (data: ShopItemUpdate) => callAdminApi('put', 'api/admin/shop/item', data);
export const deleteShopItem = (id: string) => callAdminApi('delete', `api/admin/shop/items/${id}`);

export const createShopCategory = (data: ShopCategorySave) => callAdminApi('post', 'api/admin/shop/category', data);
export const updateShopCategory = (data: ShopCategoryUpdate) => callAdminApi('put', 'api/admin/shop/category', data);
export const getShopCategory = (id: string) => callAdminApi<ShopCategoryInfo>('get', `api/admin/shop/categories/${id}`);
export const deleteShopCategory = (id: string) => callAdminApi('delete', `api/admin/shop/categories/${id}`);

export const getShopCategories = async () => {
  try {
    const data = await callAdminApi<ShopCategoryItem[]>('get', 'api/admin/shop/categories');
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
export const getShopProducts = async () => {
  try {
    const data = await callAdminApi<ShopItemInfo[]>('get', 'api/admin/shop/items');
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
