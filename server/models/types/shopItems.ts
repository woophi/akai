import { Model } from './mongoModel';
import { File } from './files';
import { LanguageContent } from './language';
import { ShopCategory } from './shopCategory';

export type ShopItem = Model<ShopItemModel>;

export type ShopItemParameter = {
  name: string;
  value: string;
  localeId: string;
};

export type ShopItemModel = {
  files: File[];
  categories: ShopCategory[];
  title: LanguageContent[];
  description: LanguageContent[];
  price: number;
  parameters: ShopItemParameter[];
  stock: number;
  deleted?: Date;
};
export type ShopItemSaveModel = ShopItemModel & {
  files: string[];
  categories: string[];
};
