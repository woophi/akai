import { Model } from './mongoModel';
import { UserModel } from './user';
import { BlogModel, LanguageContent } from './blog';
import { Files } from './files';

export type GeneralAlbumModel = {
  title: LanguageContent[];
}

export type AlbumSaveModel = GeneralAlbumModel & {
  createdBy: string;
  albums?: string[];
  blogs?: string[];
  coverPhoto: string;
}

export type AlbumModel = GeneralAlbumModel & {
  createdBy: UserModel;
  albums: AlbumModel[];
  blogs: BlogModel[];
  coverPhoto: Files;
}

export type Album = Model<AlbumModel>
