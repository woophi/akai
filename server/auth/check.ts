import { Request, Response, NextFunction } from 'express';
import { Logger } from '../logger';
import * as identity from '../identity';
import { HTTPStatus, SessionData } from 'server/lib/models';
import { fetchUserData } from './operations';

export const checkUser = async (req: Request, res: Response, next: NextFunction) => {
  Logger.debug('User check from FE');
  const cookie = req.signedCookies[identity.SessionCookie.SesId];

  const validateTokenResult = await identity.validateTokenAndCreateNewAccessToken(
    cookie,
    req.session as unknown as SessionData
  );

  if (!validateTokenResult) {
    return res.sendStatus(HTTPStatus.Empty);
  }

  const userId = (req.session as unknown as SessionData).userId;
  const userData = await fetchUserData(userId);
  return res.send({ ...userData, token: validateTokenResult, userId });
};
