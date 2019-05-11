import { Request, Response, NextFunction } from 'express';
import BlogModel from '../../models/blog';
import * as models from '../../models/types';
import { Logger } from '../../logger';

export const getAllBlogs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return BlogModel.find().lean().exec((err, blogs: models.Blog[]) => {
    if (err) {
      Logger.error('err to get all blogs ' + err);
      return res.send().status(500);
    }
    if (!blogs || !blogs.length) {
      res.send([]).status(200);
    }
    const data = blogs.map(b => ({ id: b._id, title: b.title}));
    return res.send(data).status(200);
  });
};
export const getBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.query['id'];
  return BlogModel.findById(id).lean().exec((err, blog: models.Blog) => {
    if (err) {
      Logger.error('err to get all blogs ' + err);
      return res.send().status(500);
    }
    const data = {
      title: blog.title,
      body: blog.body,
      photos: blog.photos[0]
    };
    return res.send(data).status(200);
  });
};
