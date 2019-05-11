import * as express from 'express';
import * as health from './controllers/health';
import { connectedUniqVisitor } from './controllers/visitors';
import { IncomingMessage, ServerResponse } from 'http';
import { UrlLike } from 'next/router';
import * as admin from './controllers/admin';
import * as blog from './controllers/blog';
import * as auth from './auth';
import * as identity from './identity';
import * as mails from './mails';
import { EmailTemplate } from './mails/types';
import { Storage } from './storage';
import { createImgPost } from './facebook';
import { Server } from 'next';

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

  app.get('/api/health', identity.authorizedForSuperAdmin, health.get);
  app.post('/api/guest/visit', connectedUniqVisitor);
  app.get('/api/guest/blogs', blog.getAllBlogs);
  app.get('/api/guest/blog', blog.getBlog);

  // user
  app.post('/api/app/user/login', auth.login);

  // admin
  app.post('/api/admin/new/user', identity.authorizedForAdmin, admin.createUser);
  app.post('/api/admin/new/blog', identity.authorizedForAdmin, admin.createNewPost);

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


  // TODO: auth for admin
  app.post('/storage/upload', (req, res, next) => {
    const blogId = req.query['blogId'];
    if (!blogId) {
      return res.status(400);
    }
    const storage = new Storage(req.files, 'process file', blogId);
    storage.performQueue();
    return res.sendStatus(204);
  });

  // facebook connect
  app.get('/setup/fb', admin.fbLogin);
  app.get('/processLogin/fb/at', admin.processLogin);
  app.get('/test/fb', async (req, res, next) => {
    await createImgPost('http://localhost:3003/p/5ccdc0783445783634f76611', 'alooooo');
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
