import { Model } from './mongoModel';
import { UserModel } from './user';
import { CommentModel } from './comment';

export type PhotoModel = {
  name: string;
  url: string;
  thumbnail: string;
};

export type Parameter = {
  name: string;
  value: string;
};

type GeneralBlogModel = {
  title: string;
  photos?: PhotoModel[];
  body: string;
  creationPictureDate?: Date;
  parameters?: Parameter[];
};

export type SaveBlogModel = GeneralBlogModel & {
  createdBy: string;
  comments?: string[];
};

export type BlogModel = GeneralBlogModel & {
  createdBy: UserModel;
  comments: CommentModel[];
};

export type Blog = Model<BlogModel>;
