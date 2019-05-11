import * as fs from 'fs';
import { FileArray, UploadedFile } from 'express-fileupload';
import { EventBus } from '../lib/events';
import { FStorageEvents } from './types';
import { Logger } from '../logger';
import { agenda } from '../lib/agenda';
import { getFilePath } from './helpers';

export class Storage {
  constructor(
    protected files: FileArray,
    protected job?: string,
    protected blogId?: string
  ) {
    Logger.debug('Storage init');
    this.upload();
    if (job) {
      this.createJob();
    }
  }

  private fileNames = Object.keys(this.files);
  private upload = () => {
    this.fileNames.forEach(fileName => {
      const file = this.files[fileName] as UploadedFile;
      const path = getFilePath(fileName);
      if (!fs.existsSync(path)) {
        fs.writeFileSync(path, file.data);
      }
    });
  };

  private createJob = () => {
    agenda.define(this.job, (job, done) => {
      this.publishToIg(this.blogId, done);
    });
  };

  publishToIg = (blogId: string, done: (err?: Error) => void) => {
    this.fileNames.forEach(fileName => {
      Logger.debug('Storage process -> ' + FStorageEvents.INSTAGRAM_ASK);
      EventBus.emit(FStorageEvents.INSTAGRAM_ASK, { fileName, blogId, done });
    });
  };

  performQueue = () => {
    agenda.now(this.job);
  };
}
