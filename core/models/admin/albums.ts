export type GeneralAlbumData = {
  nameEn: string;
  nameRu: string;
  nameCs: string;
  coverPhotoId: string;
  blogs: string[];
};

export type NewAlbumData = GeneralAlbumData;

export type AlbumData = {
  id: string;
} & GeneralAlbumData;
