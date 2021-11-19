import { File } from './files';
import { LanguageMap } from './language';
import { Model } from './mongoModel';
import { ShopItem } from './shopItems';

export type ShopCategoryModel = {
  name: LanguageMap;
  coverPhoto: File;
  shopItems: ShopItem[];
  deleted: Date | null;
};

export type ShopCategory = Model<ShopCategoryModel>;
