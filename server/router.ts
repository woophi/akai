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
  app.get('/api/guest/youtube/live/chat', controllers.getLastChatLiveStreamId);

  app.get('/api/guest/photos', controllers.getPhotos);

  app.get('/api/guest/albums', controllers.getAlbums);
  app.get('/api/guest/album', controllers.getAlbum);
  app.get('/api/guest/blog', controllers.getBlog);

  app.post('/api/guest/blog/like', controllers.likeBlog);
  app.get('/api/guest/blog/like', controllers.getPersonalLikeState);
  app.delete('/api/guest/blog/dislike', controllers.removeLikeFromBlog);

  app.get('/api/guest/comments/blog', controllers.getBlogComments);
  app.post('/api/guest/comments/new/blog', controllers.newComment);
  app.get('/api/guest/comments/comment', controllers.getComment);
  // pass reset
  app.post('/api/guest/password/reset', controllers.resetPassword);
  app.patch('/api/guest/password/update', controllers.updatePassword);
  // unsub
  app.get('/api/guest/unsub/state', controllers.getUnsubLinkState);
  app.put('/api/guest/unsub', controllers.guestUnsub);

  // user
  app.post('/api/app/user/login', userBruteforce.prevent, auth.login);
  app.post('/api/app/user/logout', userBruteforce.prevent, identity.validateToken, auth.logout);
  app.post('/api/app/user/check', auth.checkUser);

  // admin
  app.post('/api/admin/new/user', identity.authorizedForSuperAdmin, controllers.createUser);

  app.post('/api/admin/new/blog', identity.authorizedForAdmin, controllers.createNewPost);
  app.get('/api/admin/get/blog', identity.authorizedForAdmin, controllers.getAdminBlogData);
  app.put('/api/admin/edit/blog', identity.authorizedForAdmin, controllers.editAdminBlogData);
  app.delete('/api/admin/delete/blog', identity.authorizedForAdmin, controllers.deleteBlog);

  app.get('/api/admin/blogs', identity.authorizedForAdmin, controllers.getAllBlogs);

  app.post('/api/admin/new/album', identity.authorizedForAdmin, controllers.createAlbum);
  app.get('/api/admin/get/album', identity.authorizedForAdmin, controllers.getAlbumData);
  app.put('/api/admin/edit/album', identity.authorizedForAdmin, controllers.editAlbumData);
  app.delete('/api/admin/delete/album', identity.authorizedForAdmin, controllers.deleteAlbum);

  app.post('/api/admin/new/language', identity.authorizedForAdmin, controllers.createNewLanguage);
  app.patch('/api/admin/toggle/language', identity.authorizedForAdmin, controllers.toggleActivationLanguage);

  app.post('/api/admin/update/slides', identity.authorizedForAdmin, controllers.updateMainSlider);
  app.get('/api/admin/get/slides', identity.authorizedForAdmin, controllers.getAdminSlider);

  app.get('/api/admin/get/bio', identity.authorizedForAdmin, controllers.getAdminBiography);
  app.post('/api/admin/update/bio', identity.authorizedForAdmin, controllers.saveBiography);

  app.get('/api/admin/get/photos', identity.authorizedForAdmin, controllers.getAdminPhotos);
  app.post('/api/admin/update/photos', identity.authorizedForAdmin, controllers.updatePhotos);

  app.post('/api/admin/update/youtubes', identity.authorizedForAdmin, controllers.updateYoutubes);
  app.post('/api/admin/create/youtube', identity.authorizedForAdmin, controllers.createNewYoutubeUrl);
  app.post('/api/admin/save/live/chat', identity.authorizedForAdmin, controllers.saveChatLiveStreamId);

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

  app.get('/unsub/:id', (req, res) => {
    const actualPage = '/unsub/guest'
    const queryParams = { id: req.params.id }
    appNext.render(req, res, actualPage, queryParams)
  });

  app.get('/password/update/:id', (req, res) => {
    const actualPage = '/password/update'
    const queryParams = { id: req.params.id }
    appNext.render(req, res, actualPage, queryParams)
  });

  app.get('/admin/albums/edit/:id', identity.authorizedForAdmin, (req, res) => {
    const actualPage = '/admin/albums/edit'
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
