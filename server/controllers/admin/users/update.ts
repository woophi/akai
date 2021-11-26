import * as async from 'async';
import { NextFunction, Request, Response } from 'express';
import * as identity from 'server/identity';
import { HTTPStatus } from 'server/lib/models';
import { Logger } from 'server/logger';
import UserModel from 'server/models/users';
import * as kia from 'server/validator';
import Joi from 'joi';
import { ContainerTypes, ValidatedRequest, ValidatedRequestSchema } from 'express-joi-validation';
import { ROLES } from 'server/identity';

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const validate = new kia.Validator(req, res, next);

  Logger.debug(`starting validate new user ${new Date().toLocaleTimeString()}`);

  const userData = {
    email: req.body.email,
    name: req.body.name,
    lastName: req.body.lastName,
    password: req.body.password,
    role: req.body.role,
  };
  async.series(
    [
      cb =>
        validate.check(
          {
            email: validate.isEmail,
            name: validate.required,
            password: validate.required,
            role: validate.required,
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
              return res.send({ error: 'User already exists' }).status(HTTPStatus.Conflict);
            }
            return cb();
          });
      },
    ],
    async () => {
      const hashing = new identity.Hashing();
      Logger.debug(`creating hash for new user password ${new Date().toLocaleTimeString()}`);

      try {
        userData.password = await hashing.hashPassword(userData.password);
      } catch (e) {
        Logger.error(e);
        return res.sendStatus(HTTPStatus.ServerError);
      }

      Logger.debug(`created hash for new user password ${new Date().toLocaleTimeString()}`);

      const { role, ...newUserData } = userData;
      const newUser = new UserModel({ ...newUserData, roles: [role] });
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

export const validateUserEdit = Joi.object({
  _id: Joi.string().required(),
  name: Joi.string().required(),
  lastName: Joi.string(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string(),
  role: Joi.string().required(),
});

interface UserEdit extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    _id: string;
    name: string;
    lastName: string;
    email: string;
    password?: string;
    role: ROLES;
  };
}

export const editUser = async (req: ValidatedRequest<UserEdit>, res: Response, next: NextFunction) => {
  const userData = req.body;

  try {
    const user = await UserModel.findById(userData._id).exec();
    if (!user) {
      return res.sendStatus(HTTPStatus.NotFound);
    }
    user.name = userData.name;
    user.lastName = userData.lastName;
    user.email = userData.email;
    user.roles = [userData.role];
    if (userData.password) {
      const hashing = new identity.Hashing();
      user.password = await hashing.hashPassword(userData.password);
    }
    await user.save();
    return res.sendStatus(HTTPStatus.OK);
  } catch (error) {
    console.error(error);
    return res.sendStatus(HTTPStatus.ServerError);
  }
};
