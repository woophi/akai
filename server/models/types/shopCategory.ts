import { LanguageContent } from './language';
import { Model } from './mongoModel';
import { ShopItem } from './shopItems';

export type ShopCategoryModel = {
  name: LanguageContent[];
  shopItems: ShopItem[];
};

export type ShopCategorySaveModel = ShopCategoryModel & {
  shopItems: string[];
};

export type ShopCategory = Model<ShopCategoryModel>;
