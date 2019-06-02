import { Request, Response, NextFunction } from 'express';
import BiographyModel from 'server/models/biography';
import * as models from 'server/models/types';
import { Logger } from 'server/logger';
import { HTTPStatus } from 'server/lib/models';

export const getBiography = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.warn((req as any).i18n, 'i18n');
  const localeId = req.query['localeId'];
  return BiographyModel.findOne()
    .populate('coverPhoto')
    .lean()
    .exec((err, bio: models.Biography) => {
      if (err) {
        Logger.error('err to get biography' + err);
        return res.sendStatus(HTTPStatus.ServerError);
      }
      const data = {
        content: bio.bio.find(b => b.localeId === localeId).content,
        photo: bio.coverPhoto.url
      };
      return res.send(data).status(HTTPStatus.OK);
    });
};
