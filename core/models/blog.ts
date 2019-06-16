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

export type BlogPreviewItem = {
  title: string;
  id: string;
  coverPhoto: string;
}

export type BlogsModel = {
  blogs: BlogPreviewItem[];
  albumTitle: string;
}
