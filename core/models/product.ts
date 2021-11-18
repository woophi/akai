import { FileItem, ShopItemParameterTypeOf } from './admin';

export type ProductParameter = {
  name: string;
  value: string;
  typeOf?: ShopItemParameterTypeOf;
};

export type RecentlyAddedProductData = {
  title: string;
  categories: string[];
  price: number;
  stock: number;
  file: FileItem;
  href: string;
};

export type RelatedProductData = RecentlyAddedProductData & {
  id: string;
};

export type ProductData = {
  _id: string;
  files: FileItem[];
  title: string;
  description: string;
  price: number;
  parameters: ProductParameter[];
  stock: number;
  categories: string[];
  recentlyAddedProduct: RecentlyAddedProductData | null;
  relatedProducts: RelatedProductData[];
};
