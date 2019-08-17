import { Model } from './mongoModel';
import { Files } from './files';

export type Slider = Model<SliderModel>

export type SliderModel = {
  slide: Files;
  ordinal: number;
}
export type SliderSaveModel = {
  slide: string;
  ordinal: number;
}
