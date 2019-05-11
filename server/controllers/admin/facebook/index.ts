import { Request, Response, NextFunction } from 'express';
import config from '../../../config';
import * as FB from '../../../facebook';
import * as async from 'async';

export const fbLogin = async (req: Request, res: Response, next: NextFunction) => {
  return res.redirect(
    FB.getLoginUrl(config.SITE_URI + 'processLogin/fb/at', false, [
      'manage_pages',
      'email',
      'publish_pages'
    ])
  );
};

export const processLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const code = req.query['code'] || '';
  const accessToken = await FB.getAccessToken(code);
  const pages = await FB.getPagesData(accessToken);
  if (req.session.user) {
    async.forEach(pages, FB.subscribePage);
  }
  return res.redirect('/');
};
