import { callApi } from './api';
import config from '../config';
import { Page } from './types';
import { Logger } from '../logger';
import FBIModel from '../models/facebookPages';
import { FacebookModel } from '../models/types';

export const getAccessToken = async (code: string): Promise<string> => {
  const { access_token } = await callApi('get', 'oauth/access_token', [
    { client_id: config.FB_APP_ID },
    { client_secret: config.FB_APP_SECRET },
    { redirect_uri: config.SITE_URI + '/processLogin/fb/at' },
    { code: code }
  ]);
  Logger.debug('Getting access_token');
  return access_token ? access_token : '';
};

export const getPagesData = async (accessToken: string): Promise<Page[]> => {
  const result = await callApi('get', 'me/accounts', [
    { access_token: accessToken }
  ]);

  if (!result.data) {
    return [];
  }
  Logger.debug('Map pages');

  return result.data.map(p => ({
    id: p.id,
    name: p.name,
    accessToken: p.access_token
  }));
};

export const getLongLivedToken = async (accessToken: string) => {
  const result = await callApi('post', 'oauth/access_token', [
    { client_id: config.FB_APP_ID },
    { client_secret: config.FB_APP_SECRET },
    { fb_exchange_token: accessToken },
    { grant_type: 'fb_exchange_token' }
  ]);

  return result.access_token ? result.access_token : '';
};

const subscribeAndSavePage = async (
  pageId: Page['id'],
  longLiveToken: string,
  name: Page['name']
) => {
  const result = await callApi('post', `${pageId}/subscribed_apps`, [
    { access_token: longLiveToken },
    { subscribed_fields: 'publisher_subscriptions, feed' }
  ]);

  if (!result.success) {
    Logger.error('FB unsuccsess ' + JSON.stringify(result));
    return false;
  }

  const fbPage = await FBIModel.findOne().where({ pageId });

  if (fbPage) {
    return fbPage.set('longLiveToken', longLiveToken).save(err => {
      if (err) {
        Logger.error(err);
        return false;
      }
      return true;
    });
  }

  const newFBI: FacebookModel = {
    pageName: name,
    pageId,
    longLiveToken
  };

  const newFBIModel = new FBIModel(newFBI);
  return newFBIModel.save(err => {
    if (err) {
      Logger.error('err to save new fb page ' + err);
      return false;
    }
    Logger.debug('new fb page saved');
    return true;
  });
};

export const subscribePage = async (page: Page) => {
  try {
    Logger.debug('subscribePage');

    const longLiveToken = await getLongLivedToken(page.accessToken);
    Logger.debug('longLiveToken');

    return await subscribeAndSavePage(page.id, longLiveToken, page.name);
  } catch (error) {
    Logger.error(error);
  }
};

export const createImgPost = async (link: string, message: string) => {

  try {
    // TODO: grace find
    const Page: FacebookModel = await FBIModel.findOne().where({pageName: '123'}).lean();
    await callApi('post', `${Page.pageId}/feed`, [
      // {picture: link},
      // {full_picture: link},
      {link},
      {message},
      {access_token: Page.longLiveToken}
    ])
  } catch (error) {
    Logger.error('createImgPost '+ error);
  }
}
