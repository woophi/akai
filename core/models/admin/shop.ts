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
};

export type ShopItemInfo = {
  _id: string;
  files: FileItem[];
  categories: string[];
  title: LocaleMap;
  description: LocaleMap;
  price: number;
  parameters: Record<LocaleId, ShopItemParameter>;
  stock: number;
  deleted?: Date;
};
