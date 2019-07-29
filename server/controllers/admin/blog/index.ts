import { Request, Response, NextFunction } from 'express';
import BlogModel from '../../../models/blog';
import * as models from '../../../models/types';
import { Logger } from '../../../logger';
import * as kia from '../../../validator';
import * as async from 'async';
import { HTTPStatus } from 'server/lib/models';

export const createNewPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validate = new kia.Validator(req, res, next);

  Logger.debug(
    `starting to create new blog post ${new Date().toLocaleTimeString()}`
  );

  /**
   * [{
   *  localeId: 'en',
   *  content: 'asdsddas'
   * }]
   */
  const blogPost: models.SaveBlogModel = {
    body: req.body.body || [],
    createdBy: req.session.user._id,
    title: req.body.title,
    topic: req.body.topic,
    socialShare: req.body.socialShare,
    photos: req.body.photos,
    creationPictureDate: req.body.creationPictureDate,
    parameters: req.body.parameters
  };
  async.series(
    [
      cb =>
        validate.check(
          {
            title: validate.notIsEmpty,
            topic: validate.notIsEmpty,
            socialShare: validate.notIsEmpty
          },
          blogPost,
          cb
        )
    ],
    () => {
      const newBlogPost = new BlogModel(blogPost);
      return newBlogPost.save((err, post) => {
        if (err) {
          Logger.error('err to save new blog post ' + err);
          return res.send().status(HTTPStatus.ServerError);
        }
        Logger.debug('new blog post saved');
        return res.send({ id: post._id }).status(HTTPStatus.OK);
      });
    }
  );
};

export const getAllBlogs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await BlogModel
      .find()
      .populate({
        path: 'photos',
        select: 'thumbnail -_id'
      })
      .select('title photos')
      .lean();
    const blogs = data.map(b => {
      return {
        id: b._id,
        title: b.title.find(t => t.localeId === 'ru').content,
        coverPhoto: b.photos[0] ? b.photos[0].thumbnail : ''
      };
    });
    return res.send(blogs).status(HTTPStatus.OK);
  } catch (error) {
    Logger.error('err to get all blogs ' + error);
    return res.send().status(HTTPStatus.ServerError);
  }
};
