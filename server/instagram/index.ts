import { IgApiClient } from 'instagram-private-api';
import * as fs from 'fs';
import { EventBus } from '../lib/events';
import { FStorageEvents, FileEventParams } from '../storage/types';
import { Logger } from '../logger';
import config from '../config';
import BlogModel from '../models/blog';
import * as models from '../models/types';
import { getFilePath } from '../storage/helpers';
import { IgEventParams, IgEvents } from './types';

export const loginToIg = async () => {
  try {
    const ig = new IgApiClient();
    Logger.debug('Instagram generate device');
    ig.state.generateDevice(config.IG_USERNAME);

    Logger.debug('Instagram login');
    await ig.simulate.preLoginFlow();
    await ig.account.login(config.IG_USERNAME, config.IG_PASSWORD);

    process.nextTick(async () => await ig.simulate.postLoginFlow());

    return ig;
  } catch (error) {
    Logger.error(error);
    return null;
  }
}

export const postToInstagram = async ({
  blogId,
  done
}: IgEventParams) => {

  Logger.debug('Fetching blog data by Id');

  const blog: models.Blog = await BlogModel.findById(blogId)
    .select('socialShare topic -_id')
    .populate({
      path: 'socialShare.photo',
      select: 'url -_id'
    })
    .lean();

  console.warn(blog, 'blog');

  if (!blog) {
    Logger.error('Blog not found');
    return done();
  }

  return done();
  // await ig.publish.photo({
  //   file: fileBuf,
  //   // caption: blog.title
  // });
};

export const registerInstagramEvents = () => {
  Logger.debug('Register Instagram Events');
  EventBus.on(IgEvents.INSTAGRAM_ASK, postToInstagram);
};


  // TODO: use for instagram publish

  // app.get('/test/axios/buffer', (req, res) => {
  //   return axios.default.get('https://res.cloudinary.com/dqbo8zk4k/image/upload/v1557655459/yn5lnlz94umroibuqicr.jpg', {
  //     responseType: 'arraybuffer',
  //     headers: {
  //       'Accept': '*/*'
  //     }
  //   }).then(async response => {
  //       console.log('response', response.data);
  //       const ig = new IgApiClient();
  //       Logger.debug('Instagram generate device');
  //       ig.state.generateDevice(config.IG_USERNAME);

  //       Logger.debug('Instagram login');
  //       await ig.simulate.preLoginFlow();
  //       await ig.account.login(config.IG_USERNAME, config.IG_PASSWORD);

  //       process.nextTick(async () => await ig.simulate.postLoginFlow());

  //       await ig.publish.photo({
  //         file: response.data,
  //         // caption: blog.title
  //       });

  //       return res.sendStatus(200);
  //   });
  // })
