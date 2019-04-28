const cloudinary = require('cloudinary').v2;
import config from '../config';
import { ClientCallback } from '../lib/events';
import * as fs from 'fs';
import { resolve } from 'path';
import { Logger } from '../logger';
import { CloudinaryImg, FStorageEvents } from './types';

cloudinary.config({
  cloud_name: config.FS_CLOUD_NAME,
  api_key: config.FS_API_KEY,
  api_secret: config.FS_API_SECRET
});


export const upload_stream = (fileName: string) =>
  cloudinary.uploader.upload_stream({}, (err, image: CloudinaryImg) => {
    Logger.debug('** Stream Upload');
    if (err) {
      Logger.error(err);
    }
    Logger.debug('* Same image, uploaded via stream');
    ClientCallback.emit(FStorageEvents.DELETE_TEMP_FILE, fileName);
  });

export const registerCloudinaryEvents = () => {
  ClientCallback.on(FStorageEvents.CLOUDINARY_ASK, fileName => {
    fs.createReadStream(resolve(__dirname, 'temp', fileName)).pipe(
      upload_stream(fileName)
    );
  });

  ClientCallback.on(FStorageEvents.DELETE_TEMP_FILE, fileName => {
    fs.unlink(resolve(__dirname, 'temp', fileName), err => {
      Logger.debug('delete file ' + fileName);
      if (err) {
        Logger.error('delete file err ' + err);
      }
    });
  });
};
