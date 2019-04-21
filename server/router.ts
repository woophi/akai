import * as express from 'express';
import * as health from './controllers/health';
import { connectedUniqVisitor } from './controllers/visitors';
import { getBlogData } from './controllers/blog';
import { IncomingMessage, ServerResponse } from 'http';
import { UrlLike } from 'next/router';
import * as admin from './controllers/admin';

export function router(app: express.Application, handle: (req: IncomingMessage, res: ServerResponse, parsedUrl?: UrlLike) => Promise<void>) {

  app.use('/favicon.ico', (req, res) => res.status(200).send());

  app.get('/api/health', health.get);
  app.post('/api/guest/visit', connectedUniqVisitor);
  app.get('/api/guest/blog?', getBlogData);

  // admin
  app.post('/api/admin/new/user', admin.createUser);

  app.get('*', (req, res) => {
    return handle(req, res);
  });
}
