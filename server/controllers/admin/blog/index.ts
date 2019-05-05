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

  const blogPost: models.SaveBlogModel = {
    body: req.body.text || undefined,
    createdBy: req.session.user._id,
    title: req.body.title
  };
  async.series(
    [
      cb =>
        validate.check(
          {
            title: validate.required
          },
          blogPost,
          cb
        )
    ],
    async () => {
      const newBlogPost = new BlogModel(blogPost);
      return newBlogPost.save(err => {
        if (err) {
          Logger.error('err to save new blog post ' + err);
          return res.send().status(500);
        }
        Logger.debug('new blog post saved');
        return res.send().status(200);
      });
    }
  );
};
