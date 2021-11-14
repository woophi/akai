import { Model } from './mongoModel';
import { File } from './files';
import { LanguageMap } from './language';

export type Slider = Model<SliderModel>;

export type SliderModel = {
  slide: File;
  ordinal: number;
  title?: LanguageMap;
  subTitle?: LanguageMap;
  button: {
    link: string | null;
    name?: LanguageMap;
  };
};
export type SliderSaveModel = {
  slide: string;
  ordinal: number;
  title: LanguageMap;
  subTitle: LanguageMap;
  button: {
    link: string | null;
    name: LanguageMap;
  };
};
