import { Request, Response, NextFunction } from 'express';
import { Logger } from 'server/logger';
import * as kia from 'server/validator';
import * as async from 'async';
import * as mails from 'server/mails';
import { EmailTemplate } from 'server/mails/types';
import UserModel from 'server/models/users';
import { ROLES } from 'server/identity';
import { HTTPStatus } from 'server/lib/models';

export const sendMailToAdmins = (req: Request, res: Response,
  next: NextFunction) => {
  const validate = new kia.Validator(req, res, next);

  const message = {
    name: req.body.name,
    email: req.body.email,
    message: req.body.message
  };
  let addresses: string[] = [];

  async.series(
    [
      cb =>
        validate.check(
          {
            name: validate.required,
            email: validate.isEmail,
            message: validate.required
          },
          message,
          cb
        ),
      cb => {
        UserModel
          .find()
          .where('roles').in([ROLES.ADMIN, ROLES.GODLIKE])
          .select('email -_id')
          .lean()
          .exec((err, usersEmail: {email: string}[]) => {
            if (err) {
              Logger.error(err);
              return res.sendStatus(HTTPStatus.ServerError);
            }
            if (usersEmail && usersEmail.length) {
              addresses = usersEmail.map(ue => ue.email);
              return cb();
            }
            return cb();
          })
      }

    ],
  () => {
    const mailer = new mails.Mailer(
      'message to admins from guest',
      EmailTemplate.contactEmail,
      addresses,
      `новое сообщение от посетителя ${message.name}`,
      '',
      message.email,
      {
        message: message.message
      }
    );
    mailer.performQueue();
    return res.sendStatus(HTTPStatus.OK);
  })

}
