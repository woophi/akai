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

export function router(app: express.Application, handle: (req: IncomingMessage, res: ServerResponse, parsedUrl?: UrlLike) => Promise<void>) {

  app.use('/favicon.ico', (req, res) => res.status(200).send());

  app.get('/api/health', identity.authorizedForSuperAdmin, health.get);
  app.post('/api/guest/visit', connectedUniqVisitor);
  app.get('/api/guest/blog?', getBlogData);

  // user
  app.post('/api/app/user/login', auth.login)

  // admin
  app.post('/api/admin/new/user', identity.authorizedForAdmin, admin.createUser);


  // TODO: remove
  app.post('/api/testMail', async (req, res, next) => {

    const mailer = new mails.Mailer();
    await mailer.init();
    return res.sendStatus(204);
  })

  app.get('*', (req, res) => {
    return handle(req, res);
  });
}
