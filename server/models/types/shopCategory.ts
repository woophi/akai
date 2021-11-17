import { LanguageMap } from './language';
import { Model } from './mongoModel';
import { ShopItem } from './shopItems';

export type ShopCategoryModel = {
  name: LanguageMap;
  shopItems: ShopItem[];
  deleted: Date | null;
};

export type ShopCategorySaveModel = ShopCategoryModel & {
  shopItems: string[];
};

export type ShopCategory = Model<ShopCategoryModel>;
