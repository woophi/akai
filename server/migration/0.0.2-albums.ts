import { SchemaNames, AlbumSaveModel, Locales } from 'server/models/types';

exports.create = {
  [SchemaNames.ALBUM]: [
    {
      title: [{
        content: 'first album',
        localeId: Locales.EN
      }, {
        content: 'первый альбом',
        localeId: Locales.RU
      }, {
        content: 'prvni album',
        localeId: Locales.CS
      }]
    },
    {
      title: [{
        content: 'second album',
        localeId: Locales.EN
      }, {
        content: 'второй альбом',
        localeId: Locales.RU
      }, {
        content: 'druhy album',
        localeId: Locales.CS
      }]
    },
  ] as AlbumSaveModel[]
};
