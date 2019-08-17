import * as async from 'async';
import * as mongoose from 'mongoose';
import * as models from '../models/types';

const Album = mongoose.model(models.SchemaNames.ALBUM);
const createAlbum = (file: models.Files, done) => {
  switch (file.name) {
    case 'black_white':
      return new Album({
        coverPhoto: file._id,
        title: [
          {
            content: 'Graphics',
            localeId: 'en'
          },
          {
            content: 'Графика',
            localeId: 'ru'
          },
          {
            content: 'Grafika',
            localeId: 'cs'
          }
        ]
      } as Partial<models.AlbumSaveModel>).save(done);
    case 'color':
      return new Album({
        coverPhoto: file._id,
        title: [
          {
            content: 'Painting',
            localeId: 'en'
          },
          {
            content: 'Живопись',
            localeId: 'ru'
          },
          {
            content: 'Malba',
            localeId: 'cs'
          }
        ]
      } as Partial<models.AlbumSaveModel>).save(done);
    case 'water_color':
      return new Album({
        coverPhoto: file._id,
        title: [
          {
            content: 'Watercolor',
            localeId: 'en'
          },
          {
            content: 'Акварель',
            localeId: 'ru'
          },
          {
            content: 'Akvarel',
            localeId: 'cs'
          }
        ]
      } as Partial<models.AlbumSaveModel>).save(done);
    case 'paints':
      return new Album({
        coverPhoto: file._id,
        title: [
          {
            content: 'Paint',
            localeId: 'en'
          },
          {
            content: 'Рисунок',
            localeId: 'ru'
          },
          {
            content: 'Paint',
            localeId: 'cs'
          }
        ]
      } as Partial<models.AlbumSaveModel>).save(done);
    case 'pastel':
      return new Album({
        coverPhoto: file._id,
        title: [
          {
            content: 'Pastel',
            localeId: 'en'
          },
          {
            content: 'Пастэль',
            localeId: 'ru'
          },
          {
            content: 'Pastel',
            localeId: 'cs'
          }
        ]
      } as Partial<models.AlbumSaveModel>).save(done);

    default:
      return done();
  }
};

module.exports = done => {
  const Files = mongoose.model(models.SchemaNames.FILES);

  Files.find().exec((err, files: models.Files[]) => {
    async.forEach(files, createAlbum, done);
  });
};
