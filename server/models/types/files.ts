import { Model } from './mongoModel';

export type File = Model<FileModel>;

export type FileModel = {
  name: string;
  url: string;
  thumbnail?: string;
};
