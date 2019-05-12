import { Request, Response, NextFunction } from 'express';
import { Logger } from '../logger';
import * as identity from '../identity';

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

  try {
    const value = await decrypt(encryptedData, req.session.user.password);
    console.warn(value, 'value');
    if (value !== req.session.user.password) {
      return res.sendStatus(204);
    }
  } catch (error) {
    Logger.error(error);
    return res.sendStatus(204);
  }
  return res.send({ token: req.session.user.accessToken });
};
