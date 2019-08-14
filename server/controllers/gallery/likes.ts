import BlogModel from 'server/models/blog';
import LikesModel from 'server/models/likes';
import VisitorsModel from 'server/models/visitors';
import * as models from 'server/models/types';
import { Logger } from 'server/logger';
import { Request, Response, NextFunction } from 'express';
import { connectUniqVisitor, VisitorCookie } from '../visitors';
import { HTTPStatus } from 'server/lib/models';

export const likeBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const blogId = req.query['id'];
    if (!blogId) {
      return res.status(HTTPStatus.BadRequest).send(false);
    }

    let visitorId = req.signedCookies[VisitorCookie.VisitId];
    if (!visitorId) {
      visitorId = await connectUniqVisitor(req, res);
    }
    const Visitor = await VisitorsModel.findOne()
      .where('visitorId', visitorId)
      .lean();

    const Like = await LikesModel.findOne()
      .where({
        blog: blogId,
        visitor: Visitor._id
      })
      .lean();

    if (Like) {
      return res.status(HTTPStatus.OK).send(true);
    }

    const Blog = (await BlogModel.findById(blogId)
      .where('deleted', undefined)
      .exec()) as models.Blog;
    if (!Blog) {
      return res.status(HTTPStatus.BadRequest).send(false);
    }

    return new LikesModel({
      blog: blogId,
      visitor: Visitor._id
    }).save((err, newLike: models.Likes) => {
      if (err) {
        Logger.error('error to like blog', err);
        return res.status(HTTPStatus.ServerError).send(false);
      }
      Blog.set({
        likes: Blog.likes ? [...Blog.likes, newLike._id] : [newLike._id]
      }).save(err => {
        if (err) {
          Logger.error('error to set like to blog', err);
        }
      });
      return res.status(HTTPStatus.OK).send(true);
    });
  } catch (error) {
    Logger.error('error to like blog', error);
    return res.status(HTTPStatus.OK).send(false);
  }
};

export const getPersonalLikeState = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const blogId = req.query['id'];
    if (!blogId) {
      return res.status(HTTPStatus.BadRequest).send(false);
    }

    let visitorId = req.signedCookies[VisitorCookie.VisitId];
    if (!visitorId) {
      return res.status(HTTPStatus.OK).send(false);
    }
    const Visitor = await VisitorsModel.findOne()
      .where('visitorId', visitorId)
      .lean();

    const Like = await LikesModel.findOne()
      .where({
        blog: blogId,
        visitor: Visitor._id
      })
      .lean();

    return res.status(HTTPStatus.OK).send(!!Like);
  } catch (error) {
    Logger.error('error to like blog', error);
    return res.status(HTTPStatus.OK).send(false);
  }
};

export const removeLikeFromBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const blogId = req.query['id'];
    if (!blogId) {
      return res.status(HTTPStatus.BadRequest).send(false);
    }

    let visitorId = req.signedCookies[VisitorCookie.VisitId];
    if (!visitorId) {
      return res.status(HTTPStatus.BadRequest).send(false);
    }
    const Blog = (await BlogModel.findById(blogId)
      .where('deleted', undefined)
      .exec()) as models.Blog;
    if (!Blog) {
      return res.status(HTTPStatus.BadRequest).send(false);
    }
    const Visitor = await VisitorsModel.findOne()
      .where('visitorId', visitorId)
      .lean();

    const Like = (await LikesModel.findOne().where({
      blog: blogId,
      visitor: Visitor._id
    })) as models.Likes;

    if (!Like) {
      return res.status(HTTPStatus.NotFound).send(false);
    }

    await Blog.set({
      likes: Blog.likes.filter(lId => lId.toString() != Like._id.toString())
    }).save(err => {
      if (err) {
        Logger.error('error to remove like from blog', err);
      }
    });

    return Like.remove(err => {
      if (err) {
        Logger.error('error to like blog', err);
        return res.status(HTTPStatus.ServerError).send(false);
      }
      return res.status(HTTPStatus.OK).send(true);
    });
  } catch (error) {
    Logger.error('error to like blog', error);
    return res.status(HTTPStatus.OK).send(false);
  }
};
