import { getCookie } from 'core/cookieManager';
import { i18next } from 'server/lib/i18n';

export const getLanguage = (req: any) => {
  const lang = req ? req.cookies['akai_lng'] : getCookie('akai_lng') || 'en';
  const curLang = (req && req['language']) || i18next.language;
  const i18n = (req && req['i18n']) || i18next;
  if (i18n && i18n.changeLanguage && curLang !== lang) {
    i18n.changeLanguage(lang);
  }

  return lang;
};
