import { Request, Response, NextFunction } from 'express';
import { Logger } from 'server/logger';
import * as kia from 'server/validator';
import * as async from 'async';
import * as mails from 'server/mails';
import { EmailTemplate, UnsubState } from 'server/mails/types';
import UserModel from 'server/models/users';
import LinkModel from 'server/models/links';
import * as models from 'server/models/types';
import { HTTPStatus } from 'server/lib/models';
import { createUniqLink, checkLinkState } from 'server/mails';
import config from 'server/config';
import { Hashing } from 'server/identity';

export const resetPassword = (req: Request, res: Response, next: NextFunction) => {
  const validate = new kia.Validator(req, res, next);

  const data = {
    email: String(req.body.email).toLowerCase(),
  };

  async.series(
    [
      cb =>
        validate.check(
          {
            email: validate.isEmail,
          },
          data,
          cb
        ),
      cb => {
        UserModel.findOne()
          .where('email', data.email)
          .exec((err, userEmail) => {
            if (err) {
              Logger.error(err);
              return res.sendStatus(HTTPStatus.ServerError);
            }
            if (!userEmail) {
              Logger.info('trying to reset pass for non existed user', data.email);
              return res.sendStatus(HTTPStatus.OK);
            }
            return cb();
          });
      },
    ],
    async () => {
      try {
        const linkId = await createUniqLink(data.email);

        await UserModel.findOneAndUpdate({ email: data.email }, { resetId: linkId }).exec();

        const mailer = new mails.Mailer(
          'message to admin reset password',
          EmailTemplate.resetPass,
          [data.email],
          `Сброс пароля`,
          '',
          'Администрация сайта',
          {
            resetUrl: `${config.SITE_URI}password/update/${linkId}`,
          }
        );

        mailer.performQueue();
      } catch (error) {
        Logger.error('resetPassword error', error);
      } finally {
        return res.sendStatus(HTTPStatus.OK);
      }
    }
  );
};

export const updatePassword = (req: Request, res: Response, next: NextFunction) => {
  const validate = new kia.Validator(req, res, next);

  const data = {
    password: req.body.password,
    linkId: req.body.linkId,
  };

  let userEmail: string;

  async.series(
    [
      cb =>
        validate.check(
          {
            password: validate.required,
            linkId: validate.required,
          },
          data,
          cb
        ),
      cb => {
        UserModel.findOne()
          .where('resetId', data.linkId)
          .exec((err, user) => {
            if (err) {
              Logger.error(err);
              return res.sendStatus(HTTPStatus.ServerError);
            }
            if (!user) {
              return res.sendStatus(HTTPStatus.OK);
            }
            userEmail = user.email;
            return cb();
          });
      },
    ],
    async () => {
      try {
        const Link = (await LinkModel.findOne({ uniqId: data.linkId }).exec()) as models.Links;

        const state = checkLinkState(Link);

        if (state === UnsubState.INVALID) {
          return res.sendStatus(HTTPStatus.OK);
        }

        const hashing = new Hashing();
        const newPass = await hashing.hashPassword(data.password);

        await UserModel.findOneAndUpdate({ resetId: data.linkId }, { password: newPass, resetId: null }).exec();

        await Link.remove();
        return res.status(HTTPStatus.OK).send(userEmail);
      } catch (error) {
        Logger.error('updatePassword error', error);
        return res.sendStatus(HTTPStatus.OK);
      }
    }
  );
};
