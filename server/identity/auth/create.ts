import { Request, Response } from 'express';
import * as kia from 'server/validator';
import UserModel from 'server/models/users';
import { Hashing } from '../hashing';
import { User } from 'server/models/types';
import { Logger } from 'server/logger';
import config from 'server/config';
import { setAccessToken, setRefreshToken, tenDaysInMS } from '../access';

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
  constructor(
    data: Data,
    req: Request,
    res: Response,
    onSuccess: (token: string) => void,
    onFail: (err: Error) => void
  ) {
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
    if (
      !validator.typeOfString(data.email) ||
      !validator.typeOfString(data.password)
    ) {
      return onFail(generalError);
    }

    UserModel
      .findOne({ email: String(data.email).toLowerCase() })
      .exec(async (err, user: User) => {
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
      })

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
        roles: user.roles
      }
      let payload: {
        accessToken: string;
        refreshToken: string;
      } = {
        accessToken: setAccessToken(tokenParams),
        refreshToken: await setRefreshToken(tokenParams, user.refreshToken)
      };
      user
        .set('refreshToken', payload.refreshToken)
        .save((err) => {
          if (err) {
            Logger.error(err);
            return onFail(generalError);
          }
        });

      try {
        const userToken = user.id + ':' + await encrypt(req.sessionID, user.password);
        const cookieOpts = {
          signed: true,
          httpOnly: !config.DEV_MODE,
          maxAge: tenDaysInMS,
        };
        req.session.cookie.maxAge = tenDaysInMS;
        req.session.user = user;
        req.session.userId = user.id;
        req.session.accessToken = payload.accessToken;
        if (!config.DEV_MODE) {
          req.session.cookie.httpOnly = true;
        }
        res.cookie('akai.uid', userToken, cookieOpts);
        onSuccess(payload.accessToken);
      } catch {
        return onFail(generalError);
      }
    });
  }
}
