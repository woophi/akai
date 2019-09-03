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
  albumId?: string;
};

export type NewBlogData = GeneralBlogData;

export type BlogData = {
  id: string;
} & GeneralBlogData;


export type BlogTopItem = {
  _id: string,
  photos: string[],
  views: number,
  title: string
}
