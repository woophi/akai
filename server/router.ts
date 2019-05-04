import * as express from 'express';
import * as health from './controllers/health';
import { connectedUniqVisitor } from './controllers/visitors';
import { getBlogData } from './controllers/blog';
import { IncomingMessage, ServerResponse } from 'http';
import { UrlLike } from 'next/router';
import * as admin from './controllers/admin';
import * as auth from './auth';
import * as identity from './identity';
import * as mails from './mails';
import { EmailTemplate } from './mails/types';
import { Storage } from './storage';

import * as FB from './facebook';
import * as async from 'async';
import config from './config';

export function router(
  app: express.Application,
  handle: (
    req: IncomingMessage,
    res: ServerResponse,
    parsedUrl?: UrlLike
  ) => Promise<void>
) {
  app.use('/favicon.ico', (req, res) => res.status(200).send());

  app.get('/api/health', identity.authorizedForSuperAdmin, health.get);
  app.post('/api/guest/visit', connectedUniqVisitor);
  app.get('/api/guest/blog?', getBlogData);

  // user
  app.post('/api/app/user/login', auth.login);

  // admin
  app.post('/api/admin/new/user', identity.authorizedForAdmin, admin.createUser);

  // TODO: remove
  app.post('/api/testMail', async (req, res, next) => {
    const mailer = new mails.Mailer(
      'test emails',
      EmailTemplate.email,
      req.body.to.split(', '),
      'test subject ````o¶¶¶¶_````q¶¶_',
      'privetiki'
    );
    mailer.performQueue();
    return res.sendStatus(204);
  });

  app.post('/storage/upload', (req, res, next) => {
    new Storage(req.files);
    return res.sendStatus(204);
  });

  // TODO: add controller

  app.get('/setup/fb', (req, response, next) => {
    return response.redirect(
      FB.getLoginUrl(config.SITE_URI + '/processLogin/fb/at', false, [
        'manage_pages',
        'email',
        'publish_pages'
      ])
    );
  });

  app.get('/processLogin/fb/at', async (req, response, next) => {
    const code = req.query['code'] || '';
    const accessToken = await FB.getAccessToken(code);
    const pages = await FB.getPagesData(accessToken);
    await async.forEach(pages, FB.subscribePage);
    return response.sendStatus(204);
  });

  app.get('*', (req, res) => {
    return handle(req, res);
  });
}
