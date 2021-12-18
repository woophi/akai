import { LocaleId } from './locales';
import { CategoryRelated } from './category';
import { RecentlyAddedProductData, RelatedProductData } from './product';

export type ShopData = {
  categories: CategoryRelated[];
  recentlyAddedProduct: RecentlyAddedProductData | null;
  products: RelatedProductData[];
  locale: LocaleId;
};
