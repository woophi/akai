import { NextFunction, Request, Response } from 'express';
import { HTTPStatus } from 'server/lib/models';
import { Logger } from 'server/logger';
import BiographyModel from 'server/models/biography';

export const getBiography = async (req: Request, res: Response, next: NextFunction) => {
  const localeId = req.query['localeId'];
  if (!localeId) return res.send({}).status(HTTPStatus.Empty);
  return BiographyModel.findOne()
    .populate('coverPhoto')
    .lean()
    .exec((err, bio) => {
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
        photo: bio.coverPhoto.url,
      };
      return res.send(data).status(HTTPStatus.OK);
    });
};
