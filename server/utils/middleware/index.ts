import { Request, Response, NextFunction } from 'express';
import config from 'server/config';

export const enforceHttps = (req: Request, res: Response, next: NextFunction) => {
  if (!req.secure && req.get('x-forwarded-proto') !== 'https' && !config.DEV_MODE) {
    res.redirect(301, `https://${req.get('host')}${req.url}`);
  } else {
    next();
  }
};
