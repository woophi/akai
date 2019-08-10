import { LocaleIds } from './locales';

export type BioModel = {
  content: string;
  photo: string;
};

export type SaveBioModel = {
  id: string;
  bio: {
    localeId: LocaleIds;
    content: string;
  }[];
  photoId: string;
};
