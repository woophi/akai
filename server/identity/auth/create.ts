import { Request, Response } from 'express';
import * as kia from 'server/validator';
import UserModel from 'server/models/users';
import { Hashing } from '../hashing';
import { User } from 'server/models/types';
import { Logger } from 'server/logger';
import config from 'server/config';
import { setAccessToken, setRefreshToken, dayInMS } from '../access';
import { SessionData } from 'server/lib/models';
import { SessionCookie } from '../session';

type Data = {
  email: string;
  password: string;
};

export class Auth extends Hashing {
  data: Data;
  req: Request;
  res: Response;
  onSuccess: (token: string) => void;
  onFail: (err: Error) => void;
  constructor(data: Data, req: Request, res: Response, onSuccess: (token: string) => void, onFail: (err: Error) => void) {
    super();
    this.data = data;
    this.req = req;
    this.res = res;
    this.onSuccess = onSuccess;
    this.onFail = onFail;
  }

  public generalError = new Error('Incorrect email or password');

  public signin = async () => {
    const { data, onFail, generalError } = this;
    if (!data) {
      return onFail(generalError);
    }
    const validator = new kia.Validator();
    if (!validator.typeOfString(data.email) || !validator.typeOfString(data.password)) {
      return onFail(generalError);
    }

    UserModel.findOne({ email: String(data.email).toLowerCase() }).exec(async (err, user) => {
      if (user) {
        try {
          const passMatch = await this.verifyPassword(String(data.password), user.password);
          if (passMatch) {
            return await this.proceedUserSession(user);
          }
        } catch {
          return onFail(generalError);
        }
      }
      if (err) {
        Logger.error(err);
      }
      return onFail(generalError);
    });
  };

  private proceedUserSession = async (user: User) => {
    const { onFail, generalError, req, onSuccess, encrypt, res } = this;
    if (!user) {
      return onFail(generalError);
    }
    req.session.regenerate(async () => {
      if (!user.password) {
        return onFail(generalError);
      }

      // if the user has a password set, store a persistence cookie to resume sessions
      const tokenParams = {
        id: user.id,
        roles: user.roles,
      };
      let payload: {
        accessToken: string;
        refreshToken: string;
      } = {
        accessToken: setAccessToken(tokenParams),
        refreshToken: await setRefreshToken(tokenParams, user.refreshToken),
      };
      user.set('refreshToken', payload.refreshToken).save(err => {
        if (err) {
          Logger.error(err);
          return onFail(generalError);
        }
      });

      try {
        const userToken = user.id + ':' + (await encrypt(req.sessionID, user.password));
        const cookieOpts = {
          signed: true,
          httpOnly: !config.DEV_MODE,
          maxAge: dayInMS,
        };
        req.session.cookie.maxAge = dayInMS;
        req.session.cookie.signed = true;
        (req.session as unknown as SessionData).user = user;
        (req.session as unknown as SessionData).userId = user.id;
        (req.session as unknown as SessionData).accessToken = payload.accessToken;
        if (!config.DEV_MODE) {
          req.session.cookie.httpOnly = true;
        }
        req.session.save(e => Logger.debug('save session', e));
        res.cookie(SessionCookie.SesId, userToken, cookieOpts);
        onSuccess(payload.accessToken);
      } catch {
        return onFail(generalError);
      }
    });
  };
}
