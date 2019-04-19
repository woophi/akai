import { Request, Response, NextFunction } from 'express';
import BlogsList from '../../models/blogs';
import { Model } from '../../models/types';
import { Logger } from '../../logger';

type Blog = {
  uniqIdentifier: string;
  title: string;
  body: string;
}

export const getBlogData = (req: Request, res: Response, next: NextFunction) => {
  const city = req.query['city'];

  BlogsList
    .findOne()
    .where('uniqIdentifier', city)
    .exec((err, blog: Model<Blog>) => {
      if (err) {
        Logger.error('err to find blog ' + err);
        return res.send().status(400);
      }
      if (!blog) {
        return res.send().status(404);
      }

      return res.json({ title: blog.title, body: blog.body });
    });
};
