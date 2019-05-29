import * as express from 'express';
import { IncomingMessage, ServerResponse } from 'http';
import { UrlLike } from 'next/router';
import * as controllers from './controllers';
import * as auth from './auth';
import * as identity from './identity';
import * as mails from './mails';
import { EmailTemplate } from './mails/types';
import * as storage from './storage';
import { createImgPost } from './facebook';
import { Server } from 'next';
import config from './config';

export function router(
  app: express.Express,
  handle: (
    req: IncomingMessage,
    res: ServerResponse,
    parsedUrl?: UrlLike
  ) => Promise<void>,
  appNext: Server
) {
  app.use('/favicon.ico', (req, res) => res.status(200).send());

  app.get('/api/health', identity.authorizedForSuperAdmin, controllers.getApiHealth);
  app.post('/api/guest/visit', controllers.connectedUniqVisitor);
  app.get('/api/guest/blogs', controllers.getAllBlogs);
  app.get('/api/guest/blog', controllers.getBlog);
  app.get('/api/guest/slides', controllers.getSlidesForGuest);
  app.post('/api/guest/subscribe', controllers.subscribeNewVisitor);

  // user
  app.post('/api/app/user/login', auth.login);
  app.post('/api/app/user/check', auth.checkUser);

  // admin
  app.post('/api/admin/new/user', identity.authorizedForAdmin, controllers.createUser);
  app.post('/api/admin/new/blog', identity.authorizedForAdmin, controllers.createNewPost);
  app.post('/api/admin/new/language', identity.authorizedForAdmin, controllers.createNewLanguage);
  app.patch('/api/admin/toggle/language', identity.authorizedForAdmin, controllers.toggleActivationLanguage);

  app.post('/api/admin/new/slides', identity.authorizedForAdmin, controllers.createNewSlides);

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

  app.post('/storage/upload', identity.authorizedForAdmin, storage.startUpload);

  // facebook connect
  app.get('/setup/fb', controllers.fbLogin);
  app.get('/processLogin/fb/at', controllers.processLogin);
  app.get('/test/fb', identity.authorizedForAdmin, async (req, res, next) => {
    const id = req.query['id'];
    await createImgPost(`${config.SITE_URI}p/${id}`, 'alooooo');
    res.sendStatus(200);
  });


  app.get('/p/:id', (req, res) => {
    const actualPage = '/post'
    const queryParams = { id: req.params.id }
    appNext.render(req, res, actualPage, queryParams)
  })

  app.get('*', (req, res) => {
    return handle(req, res);
  });
}
