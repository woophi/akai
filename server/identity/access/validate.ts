import { verifyToken } from './verify';
import { requireUser } from './claims';
import { Request, Response, NextFunction } from 'express';
import { ROLES } from './constants';

const getToken = (req: Request) => {
  return req.headers.authorization || (req.session.user && req.session.user.accessToken) || '';
}

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
	requireUser(req, res);
	const userId = req.body.userId;
	const token = getToken(req);
	if (!token)
		return res.send({ error: 'Authentication failed' }).status(401);

	const { claims, verificaitionError } = verifyToken(token);
  if (verificaitionError)
    return res.send({ error: 'Authentication failed' }).status(403);

  if (userId && userId !== claims.id)
    return res.send({ error: 'Authentication failed' }).status(400);
	next();
}

export const authorizedForAdmin = (req: Request,  res: Response,  next: NextFunction) => {
	if (!requireUser(req, res)) return;
	const token = getToken(req);
	const { claims, verificaitionError } = verifyToken(token);
	if (verificaitionError)
		return res.send({ error: 'Authentication failed' }).status(403);

  if (!claims.roles.find(r => r === ROLES.GODLIKE || r === ROLES.ADMIN))
    return res.send({ error: 'Unable to get data' }).status(400);
	next();
}

export const authorizedForSuperAdmin = (req: Request,  res: Response,  next: NextFunction) => {
	if (!requireUser(req, res)) return;
  const token = getToken(req);
	const { claims, verificaitionError } = verifyToken(token);
	if (verificaitionError)
		return res.send({ error: 'Authentication failed' }).status(403);

	if (!claims.roles.find(r => r === ROLES.GODLIKE))
    return res.send({ error: 'Unable to get data' }).status(400);
	next();
}
