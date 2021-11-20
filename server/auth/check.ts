import { Request, Response } from 'express';
import { HTTPStatus, SessionData } from 'server/lib/models';
import * as identity from '../identity';
import { Logger } from '../logger';
import { fetchUserData } from './operations';

export const checkUser = async (req: Request, res: Response) => {
  Logger.debug('User check from FE', identity.SessionCookie.SesId);
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
