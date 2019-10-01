import { IgApiClient } from 'instagram-private-api';
import { EventBus } from '../lib/events';
import { Logger } from '../logger';
import config from '../config';
import BlogModel from '../models/blog';
import * as models from '../models/types';
import { IgEventParams, IgEvents } from './types';
const Jimp = require('jimp');

export const ig = new IgApiClient();
const loginToIg = async () => {
  try {
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
};

export const postToInstagram = async ({ blogId, done }: IgEventParams) => {
  Logger.debug('Fetching blog data by Id');

  const blog: models.Blog = await BlogModel.findById(blogId)
    .select('socialShare topic -_id')
    .populate({
      path: 'socialShare.photo',
      select: 'url -_id'
    })
    .lean();

  if (!blog) {
    Logger.error('Blog not found');
    if (done) {
      return done();
    }
    return;
  }
  const topic = blog.topic.find(t => t.localeId === blog.socialShare.localeId);

  try {
    const ig = await loginToIg();
    if (!ig) throw Error('failed login to instagram');

    const jimpInit = await Jimp.read(blog.socialShare.photo.url);
    jimpInit.contain(igPerfectResolution, igPerfectResolution, async (e, v) => {
      if (e) {
        Logger.info(e);
        throw Error('something went wrong with jimp contain');
      }
      Logger.debug('trying to get buff');
      const buffData = await v.getBufferAsync('image/jpeg');
      Logger.debug('got buff');
      await ig.publish.photo({
        file: buffData,
        caption: topic ? topic.content : ''
      });
      Logger.debug('ig photo published');
    });
  } catch (error) {
    Logger.error(error);
  }
  if (done) {
    return done();
  }
};

export const registerInstagramEvents = () => {
  Logger.debug('Register Instagram Events');
  EventBus.on(IgEvents.INSTAGRAM_ASK, postToInstagram);
};

const igPerfectResolution = 1080;
