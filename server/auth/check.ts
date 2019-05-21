import { Request, Response, NextFunction } from 'express';
import { Logger } from '../logger';
import * as identity from '../identity';
import * as options from '../options';

const decrypt = new identity.Encryption().decrypt;
export const checkUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cookie = req.signedCookies['akai.uid'];
  if (!req.session.user || !cookie) {
    return res.sendStatus(204);
  }

  const splitCookie = cookie.split(':');
  const userId = splitCookie[0];

  if (req.session.userId !== userId) {
    return res.sendStatus(204);
  }
  const encryptedData = splitCookie[1];
  let accessToken = req.session.user.accessToken;
  try {
    const token = await decrypt(encryptedData, req.session.user.password);
    const verification = await identity.verifyToken(token);
    if (verification.verificaitionError) {
      options.set('prevUrl', req.url);
      return res.redirect('/login');
    }
    const access = await identity.verifyToken(accessToken);
    if (access.verificaitionError) {
      accessToken = await identity.setAccessToken({ id: userId, roles: req.session.user.roles });
    }

  } catch (error) {
    Logger.error(error);
    return res.sendStatus(204);
  }
  return res.send({ token: accessToken });
};
