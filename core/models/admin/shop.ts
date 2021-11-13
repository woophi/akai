import { FileItem } from './files';
import { LocaleMap, LocaleId } from '../locales';

export type ShopCategorySave = {
  name: LocaleMap;
  shopItems: string[];
};
export type ShopCategoryUpdate = ShopCategorySave & {
  _id: string;
};

export type ShopCategoryItem = {
  _id: string;
  name: LocaleMap;
};

export type ShopCategoryInfo = ShopCategoryItem & {
  shopItems: ShopItemInfo[];
};

export type ShopItemParameter = {
  name: string;
  value: string;
  localeId: LocaleId;
};

type ShopItemModel = {
  title: LocaleMap;
  description: LocaleMap;
  price: number;
  parameters: ShopItemParameter[];
  stock: number;
  categories: string[];
};

export type ShopItemInfo = ShopItemModel & {
  _id: string;
  files: FileItem[];
};

export type ShopItemSave = ShopItemModel & {
  files: string[];
};
export type ShopItemUpdate = ShopItemSave & {
  _id: string;
};
