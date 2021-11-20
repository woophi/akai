import { RecentlyAddedProductData, RelatedProductData } from './product';

export type CategoryData = {
  products: RelatedProductData[];
  name: string;
  coverPhoto: string;
  recentlyAddedProduct: RecentlyAddedProductData | null;
};

export type CategoryRelated = {
  id: string;
  name: string;
  productsCount: number;
  coverPhoto: string;
};

export type ShopRelatedData = {
  products: RelatedProductData[];
  categories: CategoryRelated[];
};
