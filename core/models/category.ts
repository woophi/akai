import { RecentlyAddedProductData, RelatedProductData } from './product';

export type CategoryData = {
  products: RelatedProductData[];
  name: string;
  recentlyAddedProduct: RecentlyAddedProductData | null;
};
