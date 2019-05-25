import { Model } from './mongoModel';

export type Language = Model<LanguageModel>

export type LanguageModel = {
  name: string;
  localeId: string;
  deleted?: Date
}
