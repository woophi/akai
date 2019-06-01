import { Model } from './mongoModel';
import { UserModel } from './user';
import { BlogModel, LanguageContent } from './blog';
import { Files } from './files';

export type GeneralBiographyModel = {
  bio: LanguageContent[];
}

export type BiographySaveModel = GeneralBiographyModel & {
  createdBy: string;
  coverPhoto: string;
}

export type BiographyModel = GeneralBiographyModel & {
  createdBy: UserModel;
  coverPhoto: Files;
}

export type Biography = Model<BiographyModel>;
