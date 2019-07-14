const NextI18Next = require('next-i18next').default;

const options = {
  fallbackLng: 'en',
  load: 'languageOnly', // we only provide en, de -> no region specific locals like en-US, de-DE
  otherLanguages: ['ru', 'cs'],
  // have a common namespace used around the full app
  ns: ['common'],
  defaultNS: 'common',

  debug: false, //process.env.NODE_ENV !== 'production',
  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ',',
    format: (value, format, lng) => {
        if (format === 'uppercase') return value.toUpperCase()
        return value
    }
  },
  detection: {
    lookupCookie: 'akai_lng',
    order: ['cookie', 'header', 'querystring'],
    caches: ['cookie'],
  },
  react: {
    useSuspense: false
  }
};

const i18n = new NextI18Next(options);

export const appWithTranslation = i18n.appWithTranslation;
export const useTranslation = i18n.useTranslation;
export const i18next = i18n.i18n;
export const withTranslation = i18n.withTranslation;

export default i18n;
