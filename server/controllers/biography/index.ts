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
  const localeId = req.query['localeId'];
  if (!localeId) return res.send({}).status(HTTPStatus.Empty);
  return BiographyModel.findOne()
    .populate('coverPhoto')
    .lean()
    .exec((err, bio: models.Biography) => {
      if (err) {
        Logger.error('err to get biography' + err);
        return res.sendStatus(HTTPStatus.ServerError);
      }
      if (!bio) {
        return res.sendStatus(HTTPStatus.NotFound);
      }
      const bioContent = bio.bio.find(b => b.localeId === localeId);
      const data = {
        content: bioContent ? bioContent.content : '',
        photo: bio.coverPhoto.url
      };
      return res.send(data).status(HTTPStatus.OK);
    });
};
