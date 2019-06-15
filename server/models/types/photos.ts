import { Model } from './mongoModel';
import { Files } from './files';

export type Photos = Model<PhotosModel>;

export type PhotosModel = {
  file: Files;
}
export type PhotosSaveModel = {
  file: string;
}
