import { Model } from './mongoModel';
import { UserModel } from './user';
import { CommentModel } from './comment';
import { FilesModel } from './files';

export type Parameter = {
  name: string;
  value: string;
  localeId: string;
};

export type LanguageContent = {
  localeId: string;
  content: string;
}

export type SocialShare = {
  localeId: string,
  photo: string
}

type GeneralBlogModel = {
  title: LanguageContent[];
  body: LanguageContent[];
  topic: LanguageContent[];
  socialShare: SocialShare;
  creationPictureDate?: Date;
  parameters?: Parameter[];
};

export type SaveBlogModel = GeneralBlogModel & {
  createdBy: string;
  comments?: string[];
  photos: string[];
};

export type BlogModel = GeneralBlogModel & {
  createdBy: UserModel;
  comments: CommentModel[];
  photos?: FilesModel[];
};

export type Blog = Model<BlogModel>;
