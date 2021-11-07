import * as async from 'async';
import { NextFunction, Request, Response } from 'express';
import { ROLES } from 'server/identity';
import { HTTPStatus } from 'server/lib/models';
import { Logger } from 'server/logger';
import * as mails from 'server/mails';
import { checkLinkState } from 'server/mails';
import { EmailTemplate, UnsubState } from 'server/mails/types';
import LinkModel from 'server/models/links';
import SubscriberModel from 'server/models/subscribers';
import UserModel from 'server/models/users';
import * as kia from 'server/validator';

export const sendMailToAdmins = (req: Request, res: Response, next: NextFunction) => {
  const validate = new kia.Validator(req, res, next);

  const message = {
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  };
  let addresses: string[] = [];

  async.series(
    [
      cb =>
        validate.check(
          {
            name: validate.required,
            email: validate.isEmail,
            message: validate.required,
          },
          message,
          cb
        ),
      cb => {
        UserModel.find()
          .where('roles')
          .in([ROLES.ADMIN, ROLES.GODLIKE])
          .select('email -_id')
          .lean()
          .exec((err, usersEmail: { email: string }[]) => {
            if (err) {
              Logger.error(err);
              return res.sendStatus(HTTPStatus.ServerError);
            }
            if (usersEmail && usersEmail.length) {
              addresses = usersEmail.map(ue => ue.email);
              return cb();
            }
            return cb();
          });
      },
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
          message: message.message,
        }
      );
      mailer.performQueue();
      return res.sendStatus(HTTPStatus.OK);
    }
  );
};

export const getUnsubLinkState = async (req: Request, res: Response, next: NextFunction) => {
  const linkId = req.query['uniqId'];
  if (!linkId) return res.status(HTTPStatus.BadRequest).send(UnsubState.INVALID);

  const Link = await LinkModel.findOne({ uniqId: String(linkId) }).exec();

  const state = checkLinkState(Link);

  Logger.debug(state);

  return res.status(HTTPStatus.OK).send(state);
};

export const guestUnsub = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const linkId = req.body.uniqId;
    if (!linkId) return res.status(HTTPStatus.BadRequest);

    const Link = await LinkModel.findOne({ uniqId: linkId }).exec();

    const state = checkLinkState(Link);

    if (state === UnsubState.INVALID) {
      return res.sendStatus(HTTPStatus.OK);
    }

    await SubscriberModel.findOneAndUpdate({ email: Link!.email }, { active: false }).exec();
    await Link!.remove();
  } catch (error) {
    Logger.error('error to update SubscriberModel', error);
  } finally {
    return res.sendStatus(HTTPStatus.OK);
  }
};
