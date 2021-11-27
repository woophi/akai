import Joi from 'joi';
import { Locales } from 'server/models/types';

export const languageContent = Joi.object({
  [Locales.RU]: Joi.string().required(),
  [Locales.EN]: Joi.string().required(),
  [Locales.CS]: Joi.string().required(),
});

export const validateLocaleId = Joi.object({
  localeId: Joi.string().required(),
});
