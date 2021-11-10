import { Model } from './mongoModel';
import { UserModel } from './user';
import { Blog } from './blog';
import { LanguageContent } from './language';
import { File } from './files';

export type GeneralAlbumModel = {
  title: LanguageContent[];
};

export type AlbumSaveModel = GeneralAlbumModel & {
  createdBy: string;
  blogs?: string[];
  coverPhoto: string;
};

export type AlbumModel = GeneralAlbumModel & {
  createdBy: UserModel;
  blogs: Blog[];
  coverPhoto: File;
};

export type Album = Model<AlbumModel>;
