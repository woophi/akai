module.exports = {
  i18n: {
    fallbackLng: 'en',
    load: 'languageOnly', // we only provide en, de -> no region specific locals like en-US, de-DE
    otherLanguages: ['ru', 'cs'],
    defaultLocale: 'ru',
    locales: ['ru', 'cs'],
    // have a common namespace used around the full app
    ns: ['common'],
    defaultNS: 'common',

    debug: process.env.NODE_ENV !== 'production',
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
  },
}