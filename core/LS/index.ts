import { RelatedProductData, ShopState } from 'core/models';

export enum LSKeys {
  RecentlyViewed = 'recently_viewed',
  Basket = 'basket',
}

export type LSData = {
  [LSKeys.RecentlyViewed]: RelatedProductData[];
  [LSKeys.Basket]: ShopState;
};

const getItem = <K extends LSKeys>(key: K, defaultValue: LSData[K]): LSData[K] => {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : defaultValue;
  } catch (error) {
    console.error(error);
    return defaultValue;
  }
};
const setItem = <K extends LSKeys>(key: K, value: LSData[K]) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
};
const deleteItem = (key: LSKeys) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(error);
  }
};

export const LS = {
  keys: LSKeys,
  getItem,
  setItem,
  deleteItem,
};
