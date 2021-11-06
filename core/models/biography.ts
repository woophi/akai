import { LocaleId } from './locales';

export type BioModel = {
  content: string;
  photo: string;
};

export type SaveBioModel = {
  id: string;
  bio: {
    localeId: LocaleId;
    content: string;
  }[];
  photoId: string;
};
