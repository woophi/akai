export type GeneralBlogData = {
  titleEn: string;
  titleRu: string;
  titleCs: string;
  bodyEn: string;
  bodyRu: string;
  bodyCs: string;
  topicEn: string;
  topicRu: string;
  topicCs: string;
  photos: string[];
  socialShare: {
    localedId: string;
    photo: string;
  };
  creationPictureDate: string;
  parameters: {
    name: string;
    value: string;
    localeId: string;
  }[],
  notifySubscribers?: boolean;
};

export type NewBlogData = GeneralBlogData;

export type BlogData = {
  id: string;
} & GeneralBlogData;
