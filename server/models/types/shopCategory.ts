import { Locales } from './language';
import { Model } from './mongoModel';
import { ShopItem } from './shopItems';

export type ShopCategoryModel = {
  name: Map<Locales, string>;
  shopItems: ShopItem[];
  deleted?: Date;
};

export type ShopCategorySaveModel = ShopCategoryModel & {
  shopItems: string[];
};

export type ShopCategory = Model<ShopCategoryModel>;
