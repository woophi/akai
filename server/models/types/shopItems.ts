import { File } from './files';
import { LanguageMap, Locales } from './language';
import { Model } from './mongoModel';
import { ShopCategory } from './shopCategory';

export type ShopItem = Model<ShopItemModel>;

export type ShopItemParameter = {
  name: string;
  value: string;
  localeId: Locales;
};

export type ShopItemModel = {
  files: File[];
  categories: ShopCategory[];
  title: LanguageMap;
  href: string;
  description: LanguageMap;
  price: number;
  parameters: ShopItemParameter[];
  stock: number;
  deleted: Date | null;
};
export type ShopItemSaveModel = ShopItemModel & {
  files: string[];
  categories: string[];
};
