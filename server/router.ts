import * as express from 'express';
import { IncomingMessage, ServerResponse } from 'http';
import * as controllers from './controllers';
import * as auth from './auth';
import * as identity from './identity';
import * as storage from './storage';
import { userBruteforce } from './lib/rate-limiter';
import { Server } from 'next';
import { UrlLike } from 'next/router';

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
  app.get('/api/guest/name', controllers.getVisitorName);

  app.get('/api/guest/slides', controllers.getSlidesForGuest);
  app.post('/api/guest/subscribe', userBruteforce.prevent, controllers.subscribeNewVisitor);
  app.post('/api/guest/send/message', userBruteforce.prevent, controllers.sendMailToAdmins);
  app.get('/api/guest/biography', controllers.getBiography);
  app.get('/api/guest/youtubes', controllers.getYoutubeUrls);
  app.get('/api/guest/photos', controllers.getPhotos);
  app.get('/api/guest/albums', controllers.getAlbums);
  app.get('/api/guest/album', controllers.getAlbum);
  app.get('/api/guest/blog', controllers.getBlog);
  app.get('/api/guest/comments/blog', controllers.getBlogComments);
  app.post('/api/guest/comments/new/blog', controllers.newComment);
  app.get('/api/guest/comments/comment', controllers.getComment);

  // user
  app.post('/api/app/user/login', userBruteforce.prevent, auth.login);
  app.post('/api/app/user/logout', userBruteforce.prevent, identity.validateToken, auth.logout);
  app.post('/api/app/user/check', auth.checkUser);

  // admin
  app.post('/api/admin/new/user', identity.authorizedForAdmin, controllers.createUser);

  app.post('/api/admin/new/blog', identity.authorizedForAdmin, controllers.createNewPost);
  app.get('/api/admin/get/blog', identity.authorizedForAdmin, controllers.getAdminBlogData);
  app.put('/api/admin/edit/blog', identity.authorizedForAdmin, controllers.editAdminBlogData);

  app.get('/api/admin/blogs', identity.authorizedForAdmin, controllers.getAllBlogs);

  app.post('/api/admin/new/album', identity.authorizedForAdmin, controllers.createAlbum);
  app.get('/api/admin/get/album', identity.authorizedForAdmin, controllers.getAlbumData);
  app.put('/api/admin/edit/album', identity.authorizedForAdmin, controllers.editAlbumData);

  app.post('/api/admin/new/language', identity.authorizedForAdmin, controllers.createNewLanguage);
  app.patch('/api/admin/toggle/language', identity.authorizedForAdmin, controllers.toggleActivationLanguage);

  app.post('/api/admin/new/slides', identity.authorizedForAdmin, controllers.createNewSlides);
  app.post('/api/admin/ordinals/slides', identity.authorizedForAdmin, controllers.changeSlidesOrdinal);

  app.post('/api/admin/save/biography', identity.authorizedForAdmin, controllers.saveBiography);

  app.post('/api/admin/new/youtube', identity.authorizedForAdmin, controllers.createNewYoutubeUrl);
  app.get('/api/admin/all/youtube', identity.authorizedForAdmin, controllers.getYoutubeUrls);
  app.delete('/api/admin/delete/youtube', identity.authorizedForAdmin, controllers.deleteYoutubeUrl);

  app.post('/storage/upload', identity.authorizedForAdmin, storage.startUpload);
  app.get('/api/admin/files', identity.authorizedForAdmin, controllers.getAllFiles);

  app.get('/api/admin/fb/pages', identity.authorizedForAdmin, controllers.getFBPIds);
  app.patch('/api/admin/fb/check/token', identity.authorizedForAdmin, controllers.checkTokenValidation);

  // facebook connect
  app.get('/setup/fb', controllers.fbLogin);
  app.get('/processLogin/fb/at', controllers.processLogin);

  app.get('/gallery/:id', (req, res) => {
    const actualPage = '/gallery/album'
    const queryParams = { id: req.params.id }
    appNext.render(req, res, actualPage, queryParams)
  });
  app.get('/gallery/album/:id', (req, res) => {
    const actualPage = '/gallery/album/blog'
    const queryParams = { id: req.params.id }
    appNext.render(req, res, actualPage, queryParams)
  });

  app.get('/admin/album/:id', identity.authorizedForAdmin, (req, res) => {
    const actualPage = '/admin/album'
    const queryParams = { id: req.params.id }
    appNext.render(req, res, actualPage, queryParams)
  });

  app.get('/admin/blogs/edit/:id', identity.authorizedForAdmin, (req, res) => {
    const actualPage = '/admin/blogs/edit'
    const queryParams = { id: req.params.id }
    appNext.render(req, res, actualPage, queryParams)
  });

  app.get('*', (req, res) => {
    return handle(req, res);
  });
}
