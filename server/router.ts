import * as express from 'express';
import { IncomingMessage, ServerResponse } from 'http';
import { UrlLike } from 'next/router';
import * as controllers from './controllers';
import * as auth from './auth';
import * as identity from './identity';
import * as mails from './mails';
import { EmailTemplate } from './mails/types';
import * as storage from './storage';
import { Server } from 'next';
import { userBruteforce } from './lib/rate-limiter';

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

  app.get('/api/health', userBruteforce.prevent, identity.authorizedForSuperAdmin, controllers.getApiHealth);
  app.post('/api/guest/visit', userBruteforce.prevent, controllers.connectedUniqVisitor);
  app.get('/api/guest/blogs', controllers.getAllBlogs);
  app.get('/api/guest/blog', controllers.getBlog);
  app.get('/api/guest/slides', controllers.getSlidesForGuest);
  app.post('/api/guest/subscribe', userBruteforce.prevent, controllers.subscribeNewVisitor);
  app.get('/api/guest/biography', userBruteforce.prevent, controllers.getBiography);

  // user
  app.post('/api/app/user/login', userBruteforce.prevent, auth.login);
  app.post('/api/app/user/check', auth.checkUser);

  // admin
  app.post('/api/admin/new/user', identity.authorizedForAdmin, controllers.createUser);
  app.post('/api/admin/new/blog', identity.authorizedForAdmin, controllers.createNewPost);
  app.post('/api/admin/new/language', identity.authorizedForAdmin, controllers.createNewLanguage);
  app.patch('/api/admin/toggle/language', identity.authorizedForAdmin, controllers.toggleActivationLanguage);

  app.post('/api/admin/new/slides', identity.authorizedForAdmin, controllers.createNewSlides);

  app.post('/api/admin/save/biography', identity.authorizedForAdmin, controllers.saveBiography);

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


  app.get('/p/:id', (req, res) => {
    const actualPage = '/post'
    const queryParams = { id: req.params.id }
    appNext.render(req, res, actualPage, queryParams)
  })

  app.get('*', (req, res) => {
    return handle(req, res);
  });
}
