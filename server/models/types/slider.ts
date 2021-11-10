import { Model } from './mongoModel';
import { File } from './files';

export type Slider = Model<SliderModel>;

export type SliderModel = {
  slide: File;
  ordinal: number;
  title: string | null;
  subTitle: string | null;
  button: {
    link: string | null;
    name: string | null;
  };
};
export type SliderSaveModel = {
  slide: string;
  ordinal: number;
  title: string | null;
  subTitle: string | null;
  button: {
    link: string | null;
    name: string | null;
  };
};
