import { Request, Response, NextFunction } from 'express';
import CommentModel from 'server/models/comment';
import VisitorModel from 'server/models/visitors';
import { HTTPStatus } from 'server/lib/models';
import { VisitorCookie } from '../visitors/types';
import * as kia from 'server/validator';
import * as async from 'async';
import { Logger } from 'server/logger';
import * as models from 'server/models/types';
import { EventBus } from 'server/lib/events';

export const getBlogComments = async (req: Request, res: Response, next: NextFunction) => {
  const blogId = req.query['id'];
  if (!blogId) return res.send([]).status(HTTPStatus.OK);
  const comments = await CommentModel.find()
    .where('blog', blogId)
    .where('deleted', undefined)
    .populate({
      path: 'visitor',
      select: 'name -_id'
    })
    .select('text createdAt')
    .sort('createdAt')
    .lean();

  const data = comments.map(c => ({
    id: c._id,
    name: c.visitor.name,
    text: c.text,
    createdAt: c.createdAt
  }))
  return res.send(data).status(HTTPStatus.OK);
}


export const getComment = async (req: Request, res: Response, next: NextFunction) => {
  const commentId = req.query['id'];
  if (!commentId) return res.sendStatus(HTTPStatus.BadRequest);
  const comment = await CommentModel.findById(commentId)
    .where('deleted', undefined)
    .populate({
      path: 'visitor',
      select: 'name -_id'
    })
    .select('text createdAt')
    .sort('createdAt')
    .lean();

  if (!comment) {
    return res.sendStatus(HTTPStatus.NotFound);
  }

  return res.send({
    id: comment._id,
    name: comment.visitor.name,
    text: comment.text,
    createdAt: comment.createdAt
  }).status(HTTPStatus.OK);
}

export const newComment = (req: Request, res: Response, next: NextFunction) => {
  const blogId = req.query['id'];
  const visitorId = req.signedCookies[VisitorCookie.VisitId];

  const validate = new kia.Validator(req, res, next);

  const comment = {
    blog: blogId,
    text: req.body.message,
    visitor: visitorId,
    name: req.body.name
  };
  async.series(
    [
      cb =>
        validate.check(
          {
            blog: validate.required,
            text: validate.required,
            visitor: validate.required,
            name: validate.required
          },
          comment,
          cb
        ),

      cb => {
        VisitorModel
          .findOne()
          .where('visitorId', visitorId)
          .exec((err, result) => {
            if (err) {
              Logger.error(err);
              return res.sendStatus(HTTPStatus.ServerError);
            }
            if (!result) {
              return res.sendStatus(HTTPStatus.BadRequest);
            }
            comment.visitor = result.id;
            result
              .set('name', comment.name)
              .save(err => {
                if (err) {
                  Logger.error(err);
                  return res.sendStatus(HTTPStatus.ServerError);
                }
                return cb();
              })
          })
      }
    ],
    async () => {
      try {
        const newComment = await new CommentModel({
          blog: comment.blog,
          text: comment.text,
          visitor: comment.visitor
        } as models.SaveCommentModel).save();
        // TODO: rooms
        EventBus.emit('new_comment', newComment.id)
        return res.sendStatus(HTTPStatus.OK);
      } catch (error) {
        Logger.error(error);
        return res.sendStatus(HTTPStatus.ServerError);
      }
    });
}