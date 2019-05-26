import { Request, Response, NextFunction } from 'express';
import BlogModel from '../../../models/blog';
import * as models from '../../../models/types';
import { Logger } from '../../../logger';
import * as kia from '../../../validator';
import * as async from 'async';

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
          return res.send().status(500);
        }
        Logger.debug('new blog post saved');
        return res.send({id: post._id}).status(200);
      });
    }
  );
};
