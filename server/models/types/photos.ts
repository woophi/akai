import { Model } from './mongoModel';
import { File } from './files';

export type Photos = Model<PhotosModel>;

export type PhotosModel = {
  file: File;
  ordinal: number;
};
export type PhotosSaveModel = {
  file: string;
  ordinal: number;
};
