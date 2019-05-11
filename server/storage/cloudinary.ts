const cloudinary = require('cloudinary').v2;
import config from '../config';
import { EventBus } from '../lib/events';
import * as fs from 'fs';
import { Logger } from '../logger';
import { CloudinaryImg, FStorageEvents, FileEventParams } from './types';
import * as async from 'async';
import BlogModel from '../models/blog';
import * as models from '../models/types';
import { getFilePath } from './helpers';

cloudinary.config({
  cloud_name: config.FS_CLOUD_NAME,
  api_key: config.FS_API_KEY,
  api_secret: config.FS_API_SECRET
});

export const upload_stream = (
  fileName: string,
  blogId: string,
  done: FileEventParams['done']
) =>
  cloudinary.uploader.upload_stream({}, (err, image: CloudinaryImg) => {
    Logger.debug('** Stream Upload');
    if (err) {
      Logger.error(err);
      return done();
    }
    Logger.debug('* Same image, uploaded via stream');
    async.series(
      [
        cb => {
          let thumbnail = '';
          if (image.height > 400) {
            const indexOfUpload = image.secure_url.indexOf('upload/') + 7;
            thumbnail =
              image.secure_url.substr(0, indexOfUpload) +
              'h_400/' +
              image.secure_url.substr(indexOfUpload);
          }
          BlogModel.findById(blogId).exec((err, blog: models.Blog) => {
            const newPhoto: models.PhotoModel = {
              name: fileName,
              url: image.secure_url,
              thumbnail: thumbnail ? thumbnail : image.secure_url
            };

            blog
              .set({
                photos: [
                  ...blog.photos,
                  newPhoto
                ]
              })
              .save(cb);
          });
        }
      ],
      () => EventBus.emit(FStorageEvents.DELETE_TEMP_FILE, { fileName, done })
    );
  });

export const registerCloudinaryEvents = () => {
  Logger.debug('Register Cloudinary Events');

  EventBus.on(
    FStorageEvents.CLOUDINARY_ASK,
    ({ fileName, blogId, done }: FileEventParams) => {
      fs.createReadStream(getFilePath(fileName)).pipe(
        upload_stream(fileName, blogId, done)
      );
    }
  );

  EventBus.on(
    FStorageEvents.DELETE_TEMP_FILE,
    ({ fileName, done }: FileEventParams) => {
      const path = getFilePath(fileName);
      if (!fs.existsSync(path)) {
        Logger.error('File not found ' + fileName);
        return done();
      }
      fs.unlink(path, err => {
        Logger.debug('delete file ' + fileName);
        if (err) {
          Logger.error('delete file err ' + err);
        }
        done(err);
      });
    }
  );
};
