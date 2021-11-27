import { LanguageMap } from './language';
import { Model } from './mongoModel';

export type TermsAndConditionsModel = {
  tcText: LanguageMap;
};

export type TermsAndConditions = Model<TermsAndConditionsModel>;
