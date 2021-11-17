import { Model } from './mongoModel';

export type Language = Model<LanguageModel>;

export type LanguageContent = {
  localeId: Locales;
  content: string;
};
export type LanguageMap = Record<Locales, string>;

export type LanguageModel = {
  name: string;
  localeId: Locales;
  deleted?: Date;
};

export enum Locales {
  EN = 'en',
  RU = 'ru',
  CS = 'cs',
}
