import { RecentlyAddedProductData, RelatedProductData } from './product';

export type CategoryData = {
  products: RelatedProductData[];
  name: string;
  coverPhoto: string;
  recentlyAddedProduct: RecentlyAddedProductData | null;
};

export type ShopRelatedData = {
  products: RelatedProductData[];
  categories: {
    name: string;
    productCount: number;
  };
};
