import * as fs from 'fs';
import { resolve } from 'path';
import { FileArray, UploadedFile } from 'express-fileupload';
import { ClientCallback } from '../lib/events';
import * as cl from './cloudinary';
import { FStorageEvents } from './types';

export class Storage {
  constructor(protected files: FileArray) {
    cl.registerCloudinaryEvents();
    this.init();
  }

  private fileNames = Object.keys(this.files);
  private init = () => {
    this.fileNames.forEach(fileName => {
      const file = this.files[fileName] as UploadedFile;
      const path = resolve(__dirname, 'temp', fileName);
      if (!fs.existsSync(path)) {
        fs.createWriteStream(path).write(file.data);
      }
      ClientCallback.emit(FStorageEvents.CLOUDINARY_ASK, fileName);
    });
  };
}
