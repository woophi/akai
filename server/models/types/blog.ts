import { Model } from './mongoModel';
import { UserModel } from './user';
import { CommentModel } from './comment';
import { FilesModel } from './files';

export type Parameter = {
  name: string;
  value: string;
  language: string;
};

export type LanguageContent = {
  language: string;
  content: string;
}

export type SocialShare = {
  language: string,
  photoUrl: string
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
  photos?: string[];
};

export type BlogModel = GeneralBlogModel & {
  createdBy: UserModel;
  comments: CommentModel[];
  photos?: FilesModel[];
};

export type Blog = Model<BlogModel>;
