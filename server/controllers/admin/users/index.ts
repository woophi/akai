import { Request, Response, NextFunction } from 'express';
import UserModel from '../../../models/users';
import { Logger } from '../../../logger';
import * as kia from '../../../validator';
import * as identity from '../../../identity';
import * as async from 'async';

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

        UserModel
          .findOne({ email: userData.email.toLowerCase() })
          .lean()
          .exec((err, user) => {
            if (err) {
              Logger.error(err);
              return next();
            }
            if (user) {
              return res.send({ error: 'User already exists' }).status(400);
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

      userData.password = await hashing.hashPassword(userData.password);

      Logger.debug(
        `created hash for new user password ${new Date().toLocaleTimeString()}`
      );

      const newUser = new UserModel(userData);
      return newUser.save(err => {
        if (err) {
          Logger.error('err to save new user ' + err);
          return res.send().status(500);
        }
        Logger.debug('new user saved');
        return res.send().status(200);
      });
    }
  );
};
