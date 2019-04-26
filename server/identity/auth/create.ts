import { Request, Response } from 'express';
import * as kia from '../../validator';
import UserModel from '../../models/users';
import { Hashing } from '../hashing';
import { User } from '../../models/types';
import { Logger } from '../../logger';
import { setAccessToken, setRefreshToken } from '../access';

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
  private tenDays = 10 * 24 * 60 * 60 * 1000;

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
      req.session.user = user;
      req.session.userId = user.id;
      // if the user has a password set, store a persistence cookie to resume sessions
      const tokenParams = {
        id: user.id,
        roles: user.roles
      }
      let payload: {
        accessToken: string;
        refershToken?: string;
      } = {
        accessToken: setAccessToken(tokenParams)
      };
      if (!user.refershToken) {
        payload.refershToken = setRefreshToken(tokenParams)
      }
      user
        .set(payload)
        .save((err) => {
          if (err) {
            Logger.error(err);
            return onFail(generalError);
          }
        });
      try {
        const userToken = user.id + ':' + await encrypt(user.password, user.password);
        const cookieOpts = {
          signed: true,
          httpOnly: true,
          maxAge: this.tenDays,
        };
        req.session.cookie.maxAge = this.tenDays;
        // req.session.cookie.httpOnly = true;
        res.cookie('akai.uid', userToken, cookieOpts);
        onSuccess(payload.accessToken);
      } catch {
        return onFail(generalError);
      }
    });
  }
}