import { Request, Response, NextFunction } from 'express';
import { Logger } from '../logger';
import * as identity from '../identity';
import { HTTPStatus, SessionData } from 'server/lib/models';
import { fetchUserData } from './operations';

const decrypt = new identity.Encryption().decrypt;
export const checkUser = async (req: Request, res: Response, next: NextFunction) => {
  const cookie = req.signedCookies['akai.uid'];
  if (!(req.session as unknown as SessionData).user || !cookie) {
    return res.sendStatus(HTTPStatus.Empty);
  }

  const splitCookie = cookie.split(':');
  const userId = splitCookie[0];

  if ((req.session as unknown as SessionData).userId !== userId) {
    return res.sendStatus(HTTPStatus.Empty);
  }
  const encryptedData = splitCookie[1];
  let accessToken = (req.session as unknown as SessionData).accessToken ?? '';

  try {
    const sessionId = await decrypt(encryptedData, (req.session as unknown as SessionData).user.password);
    if (sessionId !== req.sessionID) {
      return res.sendStatus(HTTPStatus.Empty);
    }

    const verifyRefreshToken = await identity.verifyToken((req.session as unknown as SessionData).user.refreshToken ?? '');
    if (verifyRefreshToken.verificaitionError) {
      return res.sendStatus(HTTPStatus.Empty);
    }

    const access = await identity.verifyToken(accessToken);
    if (access.verificaitionError) {
      accessToken = identity.setAccessToken({
        id: userId,
        roles: (req.session as unknown as SessionData).user.roles,
      });
      (req.session as unknown as SessionData).accessToken = accessToken;
      (req.session as unknown as SessionData).cookie.expires = new Date(Date.now() + identity.tenDaysInMS);
      (req.session as unknown as SessionData).save(() => Logger.debug('resave session'));
    }
  } catch (error) {
    Logger.error(error);
    return res.sendStatus(HTTPStatus.Empty);
  }
  const userData = await fetchUserData(userId);
  return res.send({ ...userData, token: accessToken, userId });
};
