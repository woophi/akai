import { verifyToken } from './verify';
import { requireUser } from './claims';
import { Request, Response, NextFunction } from 'express';
import { ROLES } from './constants';
import { HTTPStatus, SessionData } from 'server/lib/models';

export const getToken = (req: Request) => {
  return (
    req.headers.authorization ||
    ((req.session as unknown as SessionData).user && (req.session as unknown as SessionData).accessToken) ||
    ''
  );
};

export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  requireUser(req, res);
  const userId = req.body.userId;
  const token = getToken(req);
  if (!token) return res.send({ error: 'Authentication failed' }).status(HTTPStatus.Unauthorized);

  const { claims, verificaitionError } = await verifyToken(token);
  if (verificaitionError) return res.send({ error: 'Authentication failed' }).status(HTTPStatus.Forbidden);

  if (userId && userId !== claims.id) return res.send({ error: 'Authentication failed' }).status(HTTPStatus.BadRequest);
  next();
};

export const authorizedForAdmin = async (req: Request, res: Response, next: NextFunction) => {
  if (!requireUser(req, res)) return;
  const token = getToken(req);
  const { claims, verificaitionError } = await verifyToken(token);
  if (verificaitionError) return res.send({ error: 'Authentication failed' }).status(HTTPStatus.Forbidden);

  if (!claims.roles?.find(r => r === ROLES.GODLIKE || r === ROLES.ADMIN))
    return res.send({ error: 'Unable to get data' }).status(HTTPStatus.BadRequest);
  next();
};

export const authorizedForSuperAdmin = async (req: Request, res: Response, next: NextFunction) => {
  if (!requireUser(req, res)) return;
  const token = getToken(req);
  const { claims, verificaitionError } = await verifyToken(token);
  if (verificaitionError) return res.send({ error: 'Authentication failed' }).status(HTTPStatus.Forbidden);

  if (!claims.roles?.find(r => r === ROLES.GODLIKE))
    return res.send({ error: 'Unable to get data' }).status(HTTPStatus.BadRequest);
  next();
};
export const authorizedForCustomer = async (req: Request, res: Response, next: NextFunction) => {
  if (!requireUser(req, res)) return;
  const token = getToken(req);
  const { claims, verificaitionError } = await verifyToken(token);
  if (verificaitionError) return res.send({ error: 'Authentication failed' }).status(HTTPStatus.Forbidden);

  if (!claims.roles?.find(r => r === ROLES.CUSTOMER))
    return res.send({ error: 'Unable to get data' }).status(HTTPStatus.BadRequest);
  next();
};
