import { Request, Response, NextFunction } from 'express';
import { Logger } from '../logger';
import * as identity from '../identity';
import * as options from '../options';

const saveUrlAndRedirect = (req: Request, res: Response) => {
  options.set('prevUrl', req.url);
  return res.send({ redirect: true });
}

const decrypt = new identity.Encryption().decrypt;
export const checkUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cookie = req.signedCookies['akai.uid'];
  if (!req.session.user || !cookie) {
    return saveUrlAndRedirect(req, res);
  }

  const splitCookie = cookie.split(':');
  const userId = splitCookie[0];

  if (req.session.userId !== userId) {
    return saveUrlAndRedirect(req, res);
  }
  const encryptedData = splitCookie[1];
  let accessToken = req.session.user.accessToken;
  try {
    const sessionId = await decrypt(encryptedData, req.session.user.password);
    if (sessionId !== req.sessionID) {
      return saveUrlAndRedirect(req, res);
    }
    const verifyRefreshToken = await identity.verifyToken(req.session.user.refreshToken);
    if (verifyRefreshToken.verificaitionError) {
      return saveUrlAndRedirect(req, res);
    }
    const access = await identity.verifyToken(accessToken);
    if (access.verificaitionError) {
      accessToken = await identity.setAccessToken({ id: userId, roles: req.session.user.roles });
      req.session.user.accessToken = accessToken;
    }

  } catch (error) {
    Logger.error(error);
    return res.sendStatus(204);
  }
  return res.send({ token: accessToken });
};
