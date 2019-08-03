import { Request, Response, NextFunction } from 'express';
import VisitorsList from 'server/models/visitors';
import { Logger } from 'server/logger';
import { VisitorCookie } from './types';
import { HTTPStatus } from 'server/lib/models';
import { connectUniqVisitor } from './operations';

export const connectedUniqVisitor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await connectUniqVisitor(req, res);
    return res.sendStatus(HTTPStatus.OK);
  } catch (error) {
    Logger.error(error);
    return res.sendStatus(HTTPStatus.ServerError);
  }
}

export const getVisitorName = async (req: Request, res: Response, next: NextFunction) => {
  const visitorId = req.signedCookies[VisitorCookie.VisitId];

  if (!visitorId) return res.send('').status(HTTPStatus.OK)

  try {
    const visitor = await VisitorsList
      .findOne()
      .where('visitorId', visitorId)
      .select('name')
      .lean();
    return res.send(visitor.name).status(HTTPStatus.OK);
  } catch (error) {
    Logger.error(error)
    return res.send('').status(HTTPStatus.OK);
  }
}
