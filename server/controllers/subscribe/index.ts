import { Request, Response, NextFunction } from 'express';
import VisitorsList from 'server/models/visitors';
import SubsList from 'server/models/subscribers';
import * as models from 'server/models/types';
import { Logger } from 'server/logger';
import * as kia from 'server/validator';
import * as async from 'async';
import { checkMailonPing } from 'server/utils/helpers';
import { HTTPStatus } from 'server/lib/models';
import { connectUniqVisitor } from '../visitors';
import { VisitorCookie } from '../visitors/types';

export const subscribeNewVisitor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validate = new kia.Validator(req, res, next);
  Logger.debug('starting visitor subscribe');

  const newSub = {
    email: String(req.body.email || '').toLocaleLowerCase()
  };

  let visitorCookieId = req.signedCookies[VisitorCookie.VisitId];
  if (!visitorCookieId) {
    visitorCookieId = await connectUniqVisitor(req, res);
  }

  let visitorId;
  async.series(
    [
      cb => {
        VisitorsList.findOne()
          .where('visitorId', visitorCookieId)
          .exec((err, visitor: models.Visitor) => {
            if (err) {
              Logger.error(err);
              return res.sendStatus(HTTPStatus.ServerError);
            }
            if (!visitor) {
              return res
                .send({ done: false, error: 'Visitor not found' })
                .status(HTTPStatus.OK);
            }
            visitorId = visitor.id;
            return cb();
          });
      },

      cb =>
        validate.check(
          {
            email: validate.isEmail
          },
          newSub,
          cb
        ),

      cb => {
        SubsList.findOne()
          .where('email', newSub.email)
          .lean()
          .exec((err, sub) => {
            if (err) {
              Logger.error(err);
              return res.sendStatus(HTTPStatus.ServerError);
            }
            if (!!sub) {
              return res
                .send({ done: false, error: 'Subscriber already exists' })
                .status(HTTPStatus.OK);
            }
            return cb();
          });
      },

      cb =>
        checkMailonPing(newSub.email, (err, valid) => {
          if (!valid || err) {
            return res
              .send({ done: false, error: 'Email probably doesn\'t exist' })
              .status(HTTPStatus.OK);
          }
          return cb();
        })
    ],
    () => {
      new SubsList({
        email: newSub.email,
        visitor: visitorId
      }).save(err => {
        if (err) {
          Logger.error(err);
          return res.sendStatus(HTTPStatus.ServerError);
        }
        return res.send({ done: true }).status(HTTPStatus.OK);
      });
    }
  );
};
