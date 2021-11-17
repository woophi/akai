import { File } from './files';
import { LanguageMap } from './language';
import { Model } from './mongoModel';
import { ShopItem } from './shopItems';

export type Slider = Model<SliderModel>;

export type SliderModel = {
  slide: File;
  ordinal: number;
  title?: LanguageMap;
  subTitle?: LanguageMap;
  button: {
    shopItem: ShopItem;
    name?: LanguageMap;
  };
};
export type SliderSaveModel = {
  slide: string;
  ordinal: number;
  title: LanguageMap;
  subTitle: LanguageMap;
  button: {
    shopItem: string;
    name: LanguageMap;
  };
};
