import { NextFunction, Request, Response } from 'express';
import { HTTPStatus, SessionData } from 'server/lib/models';
import { Logger } from 'server/logger';
import { Encryption } from '../encryption';
import { SessionCookie } from '../session';
import { setAccessToken } from './assign';
import { requireUser } from './claims';
import { ROLES, tenDaysInMS } from './constants';
import { verifyToken } from './verify';

const decrypt = new Encryption().decrypt;

export const validateTokenAndCreateNewAccessToken = async (signedCookie: string, userSession: SessionData) => {
  if (!userSession.user || !signedCookie) {
    Logger.info('Connot validate token -> empty params', !userSession.user ? 'NO SESSION' : 'NO COOKIE');
    return false;
  }

  const splitCookie = signedCookie.split(':');
  const userId = splitCookie[0];

  if (userSession.userId !== userId) {
    Logger.info('Connot validate token -> wrong user usage, prob stolen cookie');
    return false;
  }
  const encryptedData = splitCookie[1];
  let accessToken = userSession.accessToken;

  try {
    const sessionId = await decrypt(encryptedData, userSession.user.password);
    if (sessionId !== userSession.id) {
      Logger.info('Connot validate token -> different sessionIds', sessionId, userSession.id);
      return false;
    }

    const verifyRefreshToken = await verifyToken(userSession.user.refreshToken ?? '');
    if (verifyRefreshToken.verificaitionError) {
      Logger.info(
        'Connot validate refresh token -> verifyRefreshToken.verificaitionError',
        JSON.stringify(verifyRefreshToken.verificaitionError)
      );
      return false;
    }

    const { verificaitionError } = await verifyToken(accessToken);

    if (verificaitionError) {
      Logger.info('Connot validate access token -> verifyToken.verificaitionError', JSON.stringify(verificaitionError));
      Logger.info('---');
      Logger.info('Setup new access token');
      accessToken = setAccessToken({
        id: userId,
        roles: userSession.user.roles ?? [],
      });
      userSession.accessToken = accessToken;
      userSession.cookie.expires = new Date(Date.now() + tenDaysInMS);
      userSession.save(() => Logger.debug('resave session'));
    }

    return { accessToken, roles: userSession.user.roles ?? [] };
  } catch (error) {
    Logger.error('Error in token validation ->', JSON.stringify(error));
    return false;
  }
};

export const authorizedForAdmin = async (req: Request, res: Response, next: NextFunction) => {
  if (!requireUser(req, res)) return;

  const cookie = req.signedCookies[SessionCookie.SesId];
  const validateTokenResult = await validateTokenAndCreateNewAccessToken(cookie, req.session as unknown as SessionData);

  if (!validateTokenResult) {
    return res.redirect('/login');
  }

  if (!validateTokenResult.roles.find(r => r === ROLES.GODLIKE || r === ROLES.ADMIN))
    return res.send({ error: 'Unable to get data' }).status(HTTPStatus.BadRequest);
  next();
};

export const authorizedForSuperAdmin = async (req: Request, res: Response, next: NextFunction) => {
  if (!requireUser(req, res)) return;

  const cookie = req.signedCookies[SessionCookie.SesId];
  const validateTokenResult = await validateTokenAndCreateNewAccessToken(cookie, req.session as unknown as SessionData);

  if (!validateTokenResult) {
    return res.redirect('/login');
  }
  if (!validateTokenResult.roles.find(r => r === ROLES.GODLIKE))
    return res.send({ error: 'Unable to get data' }).status(HTTPStatus.BadRequest);
  next();
};

export const authorizedForUser = async (req: Request, res: Response, next: NextFunction) => {
  if (!requireUser(req, res)) return;

  const cookie = req.signedCookies[SessionCookie.SesId];
  const validateTokenResult = await validateTokenAndCreateNewAccessToken(cookie, req.session as unknown as SessionData);

  if (!validateTokenResult) {
    return res.redirect('/login');
  }
  next();
};
