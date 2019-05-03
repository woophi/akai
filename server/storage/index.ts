import * as fs from 'fs';
import { resolve } from 'path';
import { FileArray, UploadedFile } from 'express-fileupload';
import { EventBus } from '../lib/events';
import * as cl from './cloudinary';
import * as ig from '../instagram';
import { FStorageEvents } from './types';
import { Logger } from '../logger';

export class Storage {
  constructor(protected files: FileArray) {
    Logger.debug('Storage register events');
    cl.registerCloudinaryEvents();
    ig.registerInstagramEvents();
    Logger.debug('Storage init');
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
      Logger.debug('Storage process -> ' + FStorageEvents.INSTAGRAM_ASK);
      EventBus.emit(FStorageEvents.INSTAGRAM_ASK, fileName);
    });
  };
}
