import { callApi } from './api';
import config from '../config';
import { Page } from './types';
import { Logger } from '../logger';
import FBIModel from '../models/facebookPages';
import { FacebookModel, FacebookPage } from '../models/types';

export const getAccessToken = async (code: string): Promise<string> => {
  const { access_token } = await callApi('get', 'oauth/access_token', [
    { client_id: config.FB_APP_ID },
    { client_secret: config.FB_APP_SECRET },
    { redirect_uri: config.SITE_URI + 'processLogin/fb/at' },
    { code: code },
  ]);
  Logger.debug('Getting access_token');
  return access_token ? access_token : '';
};

export const getPagesData = async (accessToken: string): Promise<Page[]> => {
  const result = await callApi('get', 'me/accounts', [{ access_token: accessToken }]);

  if (!result.data) {
    return [];
  }
  Logger.debug('Map pages');

  return result.data.map((p: any) => ({
    id: p.id,
    name: p.name,
    accessToken: p.access_token,
  }));
};

export const getLongLivedToken = async (accessToken: string) => {
  const result = await callApi('post', 'oauth/access_token', [
    { client_id: config.FB_APP_ID },
    { client_secret: config.FB_APP_SECRET },
    { fb_exchange_token: accessToken },
    { grant_type: 'fb_exchange_token' },
  ]);

  return result.access_token ? result.access_token : '';
};

const subscribeAndSavePage = async (page: Page, longLiveToken: string) => {
  const result = await callApi('post', `${page.id}/subscribed_apps`, [
    { access_token: longLiveToken },
    { subscribed_fields: 'publisher_subscriptions, feed' },
  ]);

  if (!result.success) {
    Logger.error('FB unsuccsess ' + JSON.stringify(result));
    return false;
  }

  const fbPage = await FBIModel.findOne().where({ pageId: page.id });

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
    pageName: page.name,
    pageId: page.id,
    longLiveToken,
    accessToken: page.accessToken,
    isValid: true,
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

    return await subscribeAndSavePage(page, longLiveToken);
  } catch (error) {
    Logger.error(error);
  }
};

export const createImgPost = async (linkOfPost: string, message: string, pageId: number) => {
  try {
    const page: { longLiveToken: string } = await FBIModel.findOne().where({ pageId }).select('longLiveToken -_id').lean();

    if (!page.longLiveToken) {
      return;
    }
    await callApi('post', `${pageId}/feed`, [{ link: linkOfPost }, { message }, { access_token: page.longLiveToken }]);
  } catch (error) {
    Logger.error('createImgPost ' + error);
  }
};

const getLongLivedTokenValidation = async (longLiveToken: string, accessToken: string) => {
  const result = await callApi('get', 'debug_token/', [{ input_token: longLiveToken }, { access_token: accessToken }]);
  return result.data ? result.data.is_valid : result.is_valid || false;
};

export const validateLongLivedToken = async (pageId: number): Promise<boolean> => {
  try {
    const fbPage = (await FBIModel.findOne().where({ pageId }).exec()) as FacebookPage;
    if (!fbPage || !fbPage.accessToken || !fbPage.longLiveToken) {
      return false;
    }

    const isValid = await getLongLivedTokenValidation(fbPage.longLiveToken, fbPage.accessToken);

    fbPage
      .set({
        isValid,
      })
      .save(err => {
        if (err) {
          Logger.error(err);
        }
      });
    return isValid;
  } catch (error) {
    Logger.error(error);
    return false;
  }
};
export const getFacebookPageIds = async () => {
  try {
    const fbPageIds: { pageId: number }[] = await FBIModel.find().select('pageId -_id').lean().exec();
    return fbPageIds.map(fp => fp.pageId);
  } catch (error) {
    Logger.error(error);
    return [];
  }
};
