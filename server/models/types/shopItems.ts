import { File } from './files';
import { Locales } from './language';
import { Model } from './mongoModel';
import { ShopCategory } from './shopCategory';

export type ShopItem = Model<ShopItemModel>;

export type ShopItemParameter = {
  name: string;
  value: string;
};

export type ShopItemModel = {
  files: File[];
  categories: ShopCategory[];
  title: Map<Locales, string>;
  description: Map<Locales, string>;
  price: number;
  parameters: Map<Locales, ShopItemParameter>;
  stock: number;
  deleted: Date | null;
};
export type ShopItemSaveModel = ShopItemModel & {
  files: string[];
  categories: string[];
};
