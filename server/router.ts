import * as express from 'express';
import { IncomingMessage, ServerResponse } from 'http';
import { NextServer } from 'next/dist/server/next';
import { join } from 'path';
import { UrlWithParsedQuery } from 'url';
import * as auth from './auth';
import * as controllers from './controllers';
import * as identity from './identity';
import { agenda } from './lib/db';
import { HTTPStatus, LocalErros } from './lib/models';
import { rateLimiterMiddleware, rateLimiterOrder, rateLimiterRegister } from './lib/rate-limiter';
import * as storage from './storage';
const Agendash = require('agendash');
import { createValidator } from 'express-joi-validation';
import { validateLocaleId } from './validations';

const options = {
  root: join(__dirname, '../assets'),
};

const validator = createValidator();

export function router(
  app: express.Express,
  handle: (req: IncomingMessage, res: ServerResponse, parsedUrl?: UrlWithParsedQuery) => Promise<void>,
  appNext: NextServer
) {
  app.use((err: any, _: any, res: any, next: any) => {
    if (err.message !== LocalErros.CORS) return next();
    return res.send({ error: LocalErros.CORS }).status(HTTPStatus.NotAllowed);
  });

  app.use('/favicon.ico', (_, res) => res.status(HTTPStatus.OK).sendFile('favicon.ico', options));
  app.use('/dash', identity.authorizedForSuperAdmin, Agendash(agenda));

  app.get('/robots.txt', (_, res) => res.status(HTTPStatus.OK).sendFile('robots.txt', options));
  app.get('/sitemap.xml', (_, res) => res.status(HTTPStatus.OK).sendFile('sitemap.xml', options));

  app.get('/api/guest/t-and-c', validator.query(validateLocaleId), controllers.getGuestTermsAndConditions);

  app.get('/api/guest/slides', validator.query(validateLocaleId), controllers.getSlidesForGuest);
  app.post('/api/guest/subscribe', rateLimiterMiddleware, controllers.subscribeNewVisitor);
  app.post('/api/guest/send/message', rateLimiterMiddleware, controllers.sendMailToAdmins);
  app.get('/api/guest/biography', controllers.getBiography);

  app.get('/api/guest/youtubes', controllers.getYoutubeUrls);
  app.get('/api/guest/youtube/live/chat', controllers.getLastChatLiveStreamId);

  app.get('/api/guest/photos', controllers.getPhotos);

  app.get('/api/guest/albums', controllers.getAlbums);
  app.get('/api/guest/album', controllers.getAlbum);
  app.get('/api/guest/blog', controllers.getBlog);

  app.post('/api/guest/blog/like', rateLimiterMiddleware, controllers.likeBlog);
  app.get('/api/guest/blog/like', controllers.getPersonalLikeState);
  app.delete('/api/guest/blog/dislike', rateLimiterMiddleware, controllers.removeLikeFromBlog);

  app.get('/api/guest/comments/blog', controllers.getBlogComments);
  app.post('/api/guest/comments/new/blog', rateLimiterMiddleware, controllers.newComment);
  app.get('/api/guest/comments/comment', controllers.getComment);
  // pass reset
  app.post('/api/guest/password/reset', rateLimiterMiddleware, controllers.resetPassword);
  app.patch('/api/guest/password/update', controllers.updatePassword);
  // unsub
  app.get('/api/guest/unsub/state', rateLimiterMiddleware, controllers.getUnsubLinkState);
  app.put('/api/guest/unsub', rateLimiterMiddleware, controllers.guestUnsub);

  // shop
  app.get('/api/guest/product', validator.query(controllers.validateGProductGet), controllers.getProductData);
  app.get('/api/guest/shop/related', validator.query(controllers.validateGShopGet), controllers.getRelatedShopData);
  app.get('/api/guest/category', validator.query(controllers.validateGProductGet), controllers.getCategoryData);

  app.post(
    '/api/guest/order',
    rateLimiterOrder,
    validator.body(controllers.createShopOrderValidate),
    controllers.createShopOrder
  );
  app.put(
    '/api/guest/order',
    rateLimiterOrder,
    validator.body(controllers.updateShopOrderValidate),
    controllers.updateShopOrder
  );

  // user
  app.post('/api/app/user/login', rateLimiterMiddleware, auth.login);
  app.post(
    '/api/app/user/register',
    rateLimiterRegister,
    validator.body(controllers.validateUserRegister),
    controllers.userRegister
  );
  app.post('/api/app/user/logout', rateLimiterMiddleware, identity.authorizedForUser, auth.logout);
  app.post('/api/app/user/check', auth.checkUser);

  // me
  app.put(
    '/api/app/user/me',
    identity.authorizedForUser,
    validator.body(controllers.validateProfileUpdate),
    controllers.updateProfile
  );

  // admin
  app.post('/api/admin/new/user', identity.authorizedForAdmin, controllers.createUser);
  app.put(
    '/api/admin/user',
    identity.authorizedForAdmin,
    validator.body(controllers.validateUserEdit),
    controllers.editUser
  );
  app.get('/api/admin/users', identity.authorizedForAdmin, controllers.getUsers);
  app.get(
    '/api/admin/user/:id',
    identity.authorizedForAdmin,
    validator.params(controllers.validateUserGet),
    controllers.getUser
  );

  // tc
  app.post(
    '/api/admin/t-and-c',
    identity.authorizedForAdmin,
    validator.body(controllers.validateTermsAndConditions),
    controllers.saveTermsAndConditions
  );
  app.get('/api/admin/t-and-c', identity.authorizedForAdmin, controllers.getTermsAndConditions);

  // shop
  app.get('/api/admin/shop/items', identity.authorizedForAdmin, controllers.getShopItems);
  app.get(
    '/api/admin/shop/items/:id',
    identity.authorizedForAdmin,
    validator.params(controllers.validateShopItemGet),
    controllers.getShopItem
  );
  app.post(
    '/api/admin/shop/item',
    identity.authorizedForAdmin,
    validator.body(controllers.validateShopItemSave),
    controllers.createShopItem
  );
  app.put(
    '/api/admin/shop/item',
    identity.authorizedForAdmin,
    validator.body(controllers.validateShopItemUpdate),
    controllers.updateShopItem
  );
  app.delete(
    '/api/admin/shop/items/:id',
    identity.authorizedForAdmin,
    validator.params(controllers.validateShopItemGet),
    controllers.deleteShopItem
  );

  app.get('/api/admin/shop/categories', identity.authorizedForAdmin, controllers.getShopCategories);
  app.get(
    '/api/admin/shop/categories/:id',
    identity.authorizedForAdmin,
    validator.params(controllers.validateShopCategoryGet),
    controllers.getShopCategory
  );
  app.post(
    '/api/admin/shop/category',
    identity.authorizedForAdmin,
    validator.body(controllers.validateShopCategorySave),
    controllers.createShopCategory
  );
  app.put(
    '/api/admin/shop/category',
    identity.authorizedForAdmin,
    validator.body(controllers.validateShopCategoryUpdate),
    controllers.updateShopCategory
  );
  app.delete(
    '/api/admin/shop/categories/:id',
    identity.authorizedForAdmin,
    validator.params(controllers.validateShopCategoryGet),
    controllers.deleteShopCategory
  );

  // orders
  app.get('/api/admin/orders', identity.authorizedForAdmin, controllers.getAdminShopOrders);

  // dashboard
  app.get('/api/admin/dashboard/topBlogs', identity.authorizedForAdmin, controllers.getTopFiveViewBlogs);

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

  app.post(
    '/api/admin/update/slides',
    identity.authorizedForAdmin,
    validator.body(controllers.validateSlideSave),
    controllers.updateMainSlider
  );
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

  app.patch('/api/admin/ig/check', identity.authorizedForAdmin, controllers.checkLoginInstagram);
  app.patch('/api/admin/ig/login', identity.authorizedForAdmin, controllers.verrifyLoginInstagram);
  app.patch('/api/admin/ig/code', identity.authorizedForAdmin, controllers.sendCodeInstagram);

  // facebook connect
  app.get('/setup/fb', controllers.fbLogin);
  app.get('/processLogin/fb/at', controllers.processLogin);

  app.get('/gallery/:id', (req, res) => {
    const actualPage = '/gallery/album';
    const queryParams = { id: req.params.id };
    appNext.render(req, res as any, actualPage, queryParams);
  });
  app.get('/gallery/album/:id', (req, res) => {
    const actualPage = '/gallery/album/blog';
    const queryParams = { id: req.params.id };
    appNext.render(req, res as any, actualPage, queryParams);
  });

  app.get('/unsub/:id', (req, res) => {
    const actualPage = '/unsub/guest';
    const queryParams = { id: req.params.id };
    appNext.render(req, res as any, actualPage, queryParams);
  });

  app.get('/password/update/:id', (req, res) => {
    const actualPage = '/password/update';
    const queryParams = { id: req.params.id };
    appNext.render(req, res as any, actualPage, queryParams);
  });

  app.get('/admin/albums/edit/:id', identity.authorizedForAdmin, (req, res) => {
    const actualPage = '/admin/albums/edit';
    const queryParams = { id: req.params.id };
    appNext.render(req, res as any, actualPage, queryParams);
  });

  app.get('/admin/blogs/edit/:id', identity.authorizedForAdmin, (req, res) => {
    const actualPage = '/admin/blogs/edit';
    const queryParams = { id: req.params.id };
    appNext.render(req, res as any, actualPage, queryParams);
  });

  app.use('/admin/*', identity.authorizedForAdmin);
  app.use('/admin', identity.authorizedForAdmin);
  app.use('/me/*', identity.authorizedForUser);
  app.use('/me', identity.authorizedForUser);

  app.get('*', (req, res) => {
    return handle(req, res as any);
  });
}
