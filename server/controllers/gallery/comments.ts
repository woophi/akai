import * as async from 'async';
import { NextFunction, Request, Response } from 'express';
import { BusEvents, EventBus } from 'server/lib/events';
import { HTTPStatus } from 'server/lib/models';
import { Logger } from 'server/logger';
import BlogModel from 'server/models/blog';
import CommentModel from 'server/models/comment';
import * as models from 'server/models/types';
import * as kia from 'server/validator';
import { Validator } from 'server/validator';

export const getBlogComments = async (req: Request, res: Response, next: NextFunction) => {
  const blogId = req.query['id'];
  if (!blogId) return res.send([]).status(HTTPStatus.OK);
  const validate = new Validator();
  if (validate.notMongooseObject(blogId)) return res.send([]).status(HTTPStatus.OK);
  try {
    const comments = await CommentModel.find()
      .where('blog', blogId)
      .where('deleted', undefined)
      .select('text createdAt')
      .sort('createdAt')
      .lean();

    const data = comments.map(c => ({
      id: c._id,
      text: c.text,
      createdAt: c.createdAt,
    }));
    return res.send(data).status(HTTPStatus.OK);
  } catch (error) {
    Logger.error(error);
    return res.send([]).status(HTTPStatus.OK);
  }
};

export const getComment = async (req: Request, res: Response, next: NextFunction) => {
  const commentId = req.query['id'];
  if (!commentId) return res.sendStatus(HTTPStatus.BadRequest);
  const validate = new Validator();
  if (validate.notMongooseObject(commentId)) return res.send({}).status(HTTPStatus.OK);
  try {
    const comment = await CommentModel.findById(commentId)
      .where('deleted', undefined)
      .select('text createdAt')
      .sort('createdAt')
      .lean();

    if (!comment) {
      return res.sendStatus(HTTPStatus.NotFound);
    }

    return res
      .send({
        id: comment._id,
        text: comment.text,
        createdAt: comment.createdAt,
      })
      .status(HTTPStatus.OK);
  } catch (error) {
    Logger.error(error);
    return res.send({}).status(HTTPStatus.OK);
  }
};

export const newComment = async (req: Request, res: Response, next: NextFunction) => {
  const blogId = req.query['id'];

  const validate = new kia.Validator(req, res, next);

  const comment = {
    blog: blogId,
    text: req.body.message,
    name: req.body.name,
  };
  async.series(
    [
      cb =>
        validate.check(
          {
            blog: validate.notMongooseObject,
            text: validate.required,
            name: validate.required,
          },
          comment,
          cb
        ),

      cb => {
        if (comment.name.length > 256 || comment.text.length > 2000) {
          return res.sendStatus(HTTPStatus.BadRequest);
        }
        return cb();
      },
    ],
    async () => {
      try {
        const newComment = await new CommentModel({
          blog: comment.blog,
          text: comment.text,
        } as models.SaveCommentModel).save();
        const blog = (await BlogModel.findById(comment.blog).exec()) as models.Blog;
        await blog.set({
          comments: blog.comments ? [...blog.comments, newComment.id] : [newComment.id],
        });
        EventBus.emit(BusEvents.NEW_COMMENT, newComment.id, blogId);
        return res.sendStatus(HTTPStatus.OK);
      } catch (error) {
        Logger.error(error);
        return res.sendStatus(HTTPStatus.BadRequest);
      }
    }
  );
};
