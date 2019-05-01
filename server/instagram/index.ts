import { IgApiClient } from 'instagram-private-api';
import * as fs from 'fs';
import { resolve } from 'path';
import { ClientCallback } from '../lib/events';
import { FStorageEvents } from '../storage/types';
import { Logger } from '../logger';
import config from '../config';

// TODO: get caption from db for particular blog
export const postToInstagram = async (fileName: string) => {
  const ig = new IgApiClient();
  Logger.debug('Instagram generate device');
  ig.state.generateDevice(config.IG_USERNAME);

  Logger.debug('Instagram login');
  await ig.simulate.preLoginFlow();
  await ig.account.login(config.IG_USERNAME, config.IG_PASSWORD);

  process.nextTick(async () => await ig.simulate.postLoginFlow());

  const fileStream = fs.createReadStream(resolve(__dirname, '../storage/temp', fileName));

  Logger.debug('Instagram read photo');

  const bufs = [];
  fileStream.on('data', (d) => { bufs.push(d); });
  fileStream.on('end', async () => {
    const fileBuf = Buffer.concat(bufs);
    Logger.debug('Instagram publish photo');

    await ig.publish.photo({
      file: fileBuf,
      caption: 'test caption'
    });
    Logger.debug('Instagram process event -> ' + FStorageEvents.CLOUDINARY_ASK);

    ClientCallback.emit(FStorageEvents.CLOUDINARY_ASK, fileName);
  });
}

export const registerInstagramEvents = () => {
  Logger.debug('Register Instagram Events');
  ClientCallback.on(FStorageEvents.INSTAGRAM_ASK, postToInstagram)
}
