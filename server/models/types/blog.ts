import { CommentModel } from './comment';
import { FilesModel, Files } from './files';
import { LikesModel } from './likes';
import { Model } from './mongoModel';
import { UserModel } from './user';

export type Parameter = {
  name: string;
  value: string;
  localeId: string;
};

export type LanguageContent = {
  localeId: string;
  content: string;
};

export type SocialShare = {
  localeId: string;
  photo: string;
};
export type SocialShare2 = {
  localeId: string;
  photo: Files;
};

type GeneralBlogModel = {
  title: LanguageContent[];
  body: LanguageContent[];
  topic: LanguageContent[];
  creationPictureDate?: Date;
  parameters?: Parameter[];
};

export type SaveBlogModel = GeneralBlogModel & {
  createdBy: string;
  comments?: string[];
  photos: string[];
  socialShare: SocialShare;
};

export type BlogModel = GeneralBlogModel & {
  createdBy: UserModel;
  comments: CommentModel[];
  photos?: FilesModel[];
  socialShare: SocialShare2;
  likes?: LikesModel[];
  views?: number;
  deleted?: Date;
};

export type Blog = Model<BlogModel>;
