import { Request, Response, NextFunction } from 'express';
import UserModel from 'server/models/users';
import { Logger } from 'server/logger';
import * as kia from 'server/validator';
import * as identity from 'server/identity';
import * as async from 'async';
import { HTTPStatus } from 'server/lib/models';
import { ROLES } from 'server/identity';

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validate = new kia.Validator(req, res, next);

  Logger.debug(`starting validate new user ${new Date().toLocaleTimeString()}`);

  const userData = {
    email: req.body.email,
    name: req.body.name,
    password: req.body.password
  };
  async.series(
    [
      cb =>
        validate.check(
          {
            email: validate.isEmail,
            name: validate.required,
            password: validate.required
          },
          userData,
          cb
        ),

      cb => {
        Logger.debug(`trying to find existing user`);

        UserModel.findOne({ email: userData.email.toLowerCase() })
          .lean()
          .exec((err, user) => {
            if (err) {
              Logger.error(err);
              return next();
            }
            if (user) {
              return res
                .send({ error: 'User already exists' })
                .status(HTTPStatus.Conflict);
            }
            return cb();
          });
      }
    ],
    async () => {
      const hashing = new identity.Hashing();
      Logger.debug(
        `creating hash for new user password ${new Date().toLocaleTimeString()}`
      );

      try {
        userData.password = await hashing.hashPassword(userData.password);
      } catch (e) {
        Logger.error(e);
        return res.sendStatus(HTTPStatus.ServerError);
      }

      Logger.debug(
        `created hash for new user password ${new Date().toLocaleTimeString()}`
      );

      // TODO: choose from post data
      const newUser = new UserModel({ ...userData, roles: [ ROLES.ADMIN ]});
      return newUser.save(err => {
        if (err) {
          Logger.error('err to save new user ' + err);
          return res.sendStatus(HTTPStatus.ServerError);
        }
        Logger.debug('new user saved');
        return res.sendStatus(HTTPStatus.OK);
      });
    }
  );
};
