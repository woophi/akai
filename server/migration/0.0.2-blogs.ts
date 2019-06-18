import { SchemaNames, SaveBlogModel, Locales } from 'server/models/types';

exports.create = {
  [SchemaNames.BLOG]: [
    {
      title: [{
        content: 'first blog',
        localeId: Locales.EN
      }, {
        content: 'первый блог',
        localeId: Locales.RU
      }, {
        content: 'prvni blog',
        localeId: Locales.CS
      }],
      body: [
        {
          content: 'content first blog',
          localeId: Locales.EN
        }, {
          content: 'content первый блог',
          localeId: Locales.RU
        }, {
          content: 'content prvni blog',
          localeId: Locales.CS
        }
      ],
      creationPictureDate: new Date(),
      topic: [
        {
          content: 'topic first blog',
          localeId: Locales.EN
        }, {
          content: 'topic первый блог',
          localeId: Locales.RU
        }, {
          content: 'topic prvni blog',
          localeId: Locales.CS
        }
      ],
      socialShare: {
        localeId: Locales.EN
      },
      parameters: [{
        localeId: Locales.EN,
        name: 'size',
        value: '123x123'
      }, {
        localeId: Locales.RU,
        name: 'размер',
        value: '123x123'
      }, {
        localeId: Locales.CS,
        name: 'velikost',
        value: '123x123'
      }]
    },
    {
      title: [{
        content: 'second blog',
        localeId: Locales.EN
      }, {
        content: 'второй блог',
        localeId: Locales.RU
      }, {
        content: 'druhy blog',
        localeId: Locales.CS
      }],
      body: [
        {
          content: 'content first blog',
          localeId: Locales.EN
        }, {
          content: 'content первый блог',
          localeId: Locales.RU
        }, {
          content: 'content prvni blog',
          localeId: Locales.CS
        }
      ],
      topic: [
        {
          content: 'topic first blog',
          localeId: Locales.EN
        }, {
          content: 'topic первый блог',
          localeId: Locales.RU
        }, {
          content: 'topic prvni blog',
          localeId: Locales.CS
        }
      ],
      socialShare: {
        localeId: Locales.EN
      },
      parameters: [{
        localeId: Locales.EN,
        name: 'size',
        value: '123x123'
      }, {
        localeId: Locales.RU,
        name: 'размер',
        value: '123x123'
      }, {
        localeId: Locales.CS,
        name: 'velikost',
        value: '123x123'
      }],
      creationPictureDate: new Date()
    },
  ] as SaveBlogModel[]
};
