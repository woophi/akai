import { CommentItem } from './comment';

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
  photo: PhotoItemModel;
};

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

export type BlogPreviewItem = {
  title: string;
  id: string;
  coverPhoto: string;
};

export type BlogsModel = {
  blogs: BlogPreviewItem[];
  albumTitle: string;
};

export type BlogModel = {
  id: string;
  title: string;
  topic: string;
  socialShare: SocialShare;
  photos: PhotoItemModel[];
  body: string;
  creationPictureDate?: Date;
  parameters?: Parameter[];
};

export type PhotoItemModel = {
  url: string;
  thumbnail: string;
  name: string;
  id: string;
};
