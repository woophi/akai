import * as async from 'async';
import { NextFunction, Request, Response } from 'express';
import { HTTPStatus } from 'server/lib/models';
import { Logger } from 'server/logger';
import SubsList from 'server/models/subscribers';
import { checkMailonPing } from 'server/utils/helpers';
import * as kia from 'server/validator';

export const subscribeNewVisitor = async (req: Request, res: Response, next: NextFunction) => {
  const validate = new kia.Validator(req, res, next);
  Logger.debug('starting visitor subscribe');

  const newSub = {
    email: String(req.body.email || '').toLocaleLowerCase(),
  };

  async.series(
    [
      cb =>
        validate.check(
          {
            email: validate.isEmail,
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
              return res.send({ done: false, error: 'Subscriber already exists' }).status(HTTPStatus.OK);
            }
            return cb();
          });
      },

      cb =>
        checkMailonPing(newSub.email, (err, valid) => {
          if (!valid || err) {
            return res.send({ done: false, error: "Email probably doesn't exist" }).status(HTTPStatus.OK);
          }
          return cb();
        }),
    ],
    () => {
      new SubsList({
        email: newSub.email,
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
