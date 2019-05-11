import { IgApiClient } from 'instagram-private-api';
import * as fs from 'fs';
import { EventBus } from '../lib/events';
import { FStorageEvents, FileEventParams } from '../storage/types';
import { Logger } from '../logger';
import config from '../config';
import BlogModel from '../models/blog';
import * as models from '../models/types';
import { getFilePath } from '../storage/helpers';

export const postToInstagram = async ({
  fileName,
  blogId,
  done
}: FileEventParams) => {
  const path = getFilePath(fileName);
  if (!fs.existsSync(path)) {
    Logger.error('File not found ' + fileName);
    return done();
  }
  const ig = new IgApiClient();
  Logger.debug('Instagram generate device');
  ig.state.generateDevice(config.IG_USERNAME);

  Logger.debug('Instagram login');
  await ig.simulate.preLoginFlow();
  await ig.account.login(config.IG_USERNAME, config.IG_PASSWORD);

  process.nextTick(async () => await ig.simulate.postLoginFlow());

  Logger.debug('Fetching blog');

  const blog: models.Blog = await BlogModel.findById(blogId).lean();

  if (!blog) {
    Logger.error('Blog not found');
    return done();
  }

  if (!fs.existsSync(path)) {
    Logger.error('File not found ' + fileName);
    return done();
  }

  const fileStream = fs.createReadStream(path);

  Logger.debug('Instagram read photo');

  const bufs = [];
  fileStream.on('data', d => {
    bufs.push(d);
  });
  fileStream.on('end', async () => {
    const fileBuf = Buffer.concat(bufs);
    Logger.debug('Instagram publish photo');

    await ig.publish.photo({
      file: fileBuf,
      caption: blog.title
    });
  });
  fileStream.on('close', () => {
    Logger.debug('Instagram process event -> ' + FStorageEvents.CLOUDINARY_ASK);
    EventBus.emit(FStorageEvents.CLOUDINARY_ASK, { fileName, blogId, done });
  });
};

export const registerInstagramEvents = () => {
  Logger.debug('Register Instagram Events');
  EventBus.on(FStorageEvents.INSTAGRAM_ASK, postToInstagram);
};
