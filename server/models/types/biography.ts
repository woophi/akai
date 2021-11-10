import { Model } from './mongoModel';
import { UserModel } from './user';
import { LanguageContent } from './language';
import { File } from './files';

export type GeneralBiographyModel = {
  bio: LanguageContent[];
};

export type BiographySaveModel = GeneralBiographyModel & {
  createdBy: string;
  coverPhoto: string;
};

export type BiographyModel = GeneralBiographyModel & {
  createdBy: UserModel;
  coverPhoto: File;
};

export type Biography = Model<BiographyModel>;
