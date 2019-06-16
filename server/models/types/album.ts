import { Model } from './mongoModel';
import { UserModel } from './user';
import { BlogModel, LanguageContent } from './blog';
import { Files } from './files';

export type GeneralAlbumModel = {
  title: LanguageContent[];
}

export type AlbumSaveModel = GeneralAlbumModel & {
  createdBy: string;
  blogs?: string[];
  coverPhoto: string;
}

export type AlbumModel = GeneralAlbumModel & {
  createdBy: UserModel;
  blogs: BlogModel[];
  coverPhoto: Files;
}

export type Album = Model<AlbumModel>
