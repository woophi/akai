import { Request, Response, NextFunction } from 'express';
import BlogModel from 'server/models/blog';
import AlbumModel from 'server/models/album';
import * as models from 'server/models/types';
import { Logger } from 'server/logger';
import * as kia from 'server/validator';
import * as async from 'async';
import { HTTPStatus, SessionData } from 'server/lib/models';
import { getFacebookPageIds, createImgPost } from 'server/facebook';
import config from 'server/config';
import { EventBus } from 'server/lib/events';
import { IgEvents } from 'server/instagram/types';
import { sendMailToSubscribersAfterBlogPost } from '../subscribers';

export const createNewPost = async (req: Request, res: Response, next: NextFunction) => {
  const validate = new kia.Validator(req, res, next);

  const blogPost: models.SaveBlogModel = {
    body: req.body.body || [],
    createdBy: (req.session as unknown as SessionData).user?._id ?? '',
    title: req.body.title,
    topic: req.body.topic,
    socialShare: req.body.socialShare,
    photos: req.body.photos,
    creationPictureDate: req.body.creationPictureDate,
    parameters: req.body.parameters || [],
  };
  const notifySubscribers = req.body.notifySubscribers;
  const albumId = req.body.albumId;
  const adminName = (req.session as unknown as SessionData).user?.name ?? '';
  let savedBlogId: string;
  async.series(
    [
      cb =>
        validate.check(
          {
            title: validate.notIsEmpty,
            topic: validate.notIsEmpty,
            photos: validate.notIsEmpty,
          },
          blogPost,
          cb
        ),
      cb => {
        const newBlogPost = new BlogModel(blogPost);
        return newBlogPost.save((err, post) => {
          if (err) {
            Logger.error('err to save new blog post ' + err);
            return res.sendStatus(HTTPStatus.ServerError);
          }
          Logger.debug('new blog post saved');
          savedBlogId = post.id;
          return cb();
        });
      },
      cb => {
        if (!savedBlogId) return res.sendStatus(HTTPStatus.BadRequest);
        if (!albumId) return cb();
        AlbumModel.findById(albumId).exec((err, album) => {
          if (err || !album) {
            Logger.error('err to get AlbumModel' + err);
            return res.sendStatus(HTTPStatus.ServerError);
          }
          album
            .set({
              blogs: [...album.blogs, savedBlogId],
            })
            .save(err => {
              if (err) {
                Logger.error('err to save AlbumModel' + err);
                return res.sendStatus(HTTPStatus.ServerError);
              }
              return cb();
            });
        });
      },
    ],
    async () => {
      if (blogPost.socialShare && blogPost.socialShare.localeId && blogPost.socialShare.photo && savedBlogId) {
        // TODO: choose from post data
        const fPages = await getFacebookPageIds();
        Logger.debug('should fetch fb pages', fPages);
        const caption = blogPost.topic.find(t => t.localeId === blogPost.socialShare.localeId)?.content ?? '';
        await createImgPost(`${config.SITE_URI}gallery/album/${savedBlogId}`, caption, fPages[0]);

        EventBus.emit(IgEvents.INSTAGRAM_ASK, { blogId: savedBlogId });
      }
      if (notifySubscribers && savedBlogId) {
        sendMailToSubscribersAfterBlogPost(savedBlogId, adminName);
      }
      return res.send(savedBlogId).status(HTTPStatus.OK);
    }
  );
};

export const getAllBlogs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await BlogModel.find()
      .where('deleted', undefined)
      .populate({
        path: 'photos',
        select: 'thumbnail -_id',
      })
      .select('title photos')
      .lean();
    const blogs = data.map(b => {
      return {
        id: b._id,
        title: b.title.find(t => t.localeId === 'ru')?.content,
        coverPhoto: b.photos?.[0] ? b.photos[0].thumbnail : '',
      };
    });
    return res.send(blogs).status(HTTPStatus.OK);
  } catch (error) {
    Logger.error('err to get all blogs ' + error);
    return res.sendStatus(HTTPStatus.ServerError);
  }
};

export const getAdminBlogData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const blogId = req.query['id'];
    if (!blogId) return res.sendStatus(HTTPStatus.BadRequest);
    const blog = (await BlogModel.findById(blogId).where('deleted', undefined).lean()) as models.Blog;

    if (!blog) return res.sendStatus(HTTPStatus.NotFound);

    const payload = {
      titleEn: blog.title.find(t => t.localeId === 'en')?.content,
      titleCs: blog.title.find(t => t.localeId === 'cs')?.content,
      titleRu: blog.title.find(t => t.localeId === 'ru')?.content,
      topicEn: blog.topic.find(t => t.localeId === 'en')?.content,
      topicCs: blog.topic.find(t => t.localeId === 'cs')?.content,
      topicRu: blog.topic.find(t => t.localeId === 'ru')?.content,
      bodyEn: blog.body.find(t => t.localeId === 'en')!.content,
      bodyCs: blog.body.find(t => t.localeId === 'cs')!.content,
      bodyRu: blog.body.find(t => t.localeId === 'ru')!.content,
      id: blog.id,
      creationPictureDate: blog.creationPictureDate,
      photos: blog.photos,
      socialShare: blog.socialShare,
      parameters: blog.parameters,
    };

    return res.send(payload).status(HTTPStatus.OK);
  } catch (error) {
    Logger.error('err to get all blogs ' + error);
    return res.sendStatus(HTTPStatus.ServerError);
  }
};

export const editAdminBlogData = async (req: Request, res: Response, next: NextFunction) => {
  const validate = new kia.Validator(req, res, next);
  const blogId = req.query['id'];
  const blogPost: Partial<models.SaveBlogModel> = {
    body: req.body.body || [],
    title: req.body.title,
    topic: req.body.topic,
    photos: req.body.photos,
    creationPictureDate: req.body.creationPictureDate,
    parameters: req.body.parameters || [],
  };
  async.series(
    [
      cb =>
        validate.check(
          {
            title: validate.notIsEmpty,
            topic: validate.notIsEmpty,
            socialShare: validate.notIsEmpty,
            photos: validate.notIsEmpty,
            blogId: validate.required,
          },
          {
            ...blogPost,
            blogId,
          },
          cb
        ),
    ],
    async () => {
      const blog = (await BlogModel.findById(blogId).where('deleted', undefined).exec()) as models.Blog;
      if (!blog) {
        return res.sendStatus(HTTPStatus.NotFound);
      }
      return blog.set(blogPost).save(err => {
        if (err) {
          Logger.error('err to edit blog post ' + err);
          return res.sendStatus(HTTPStatus.ServerError);
        }
        Logger.debug('edit blog post saved');
        return res.sendStatus(HTTPStatus.OK);
      });
    }
  );
};

export const deleteBlog = async (req: Request, res: Response, next: NextFunction) => {
  const validate = new kia.Validator(req, res, next);
  const blogId = req.query['id'];
  async.series(
    [
      cb =>
        validate.check(
          {
            blogId: validate.required,
          },
          {
            blogId,
          },
          cb
        ),
    ],
    async () => {
      const blog = (await BlogModel.findById(blogId).where('deleted', undefined).exec()) as models.Blog;
      if (!blog) {
        return res.sendStatus(HTTPStatus.NotFound);
      }
      return blog.set({ deleted: Date.now() }).save(err => {
        if (err) {
          Logger.error('err to delete blog post ' + err);
          return res.sendStatus(HTTPStatus.ServerError);
        }
        Logger.debug('delete blog post saved');
        return res.sendStatus(HTTPStatus.OK);
      });
    }
  );
};
