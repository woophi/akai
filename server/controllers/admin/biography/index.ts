import { Request, Response, NextFunction } from 'express';
import BiographyModel from 'server/models/biography';
import * as models from 'server/models/types';
import { Logger } from 'server/logger';
import * as kia from 'server/validator';
import * as async from 'async';
import { HTTPStatus } from 'server/lib/models';

export const saveBiography = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validate = new kia.Validator(req, res, next);

  const biographyData: models.BiographySaveModel = {
    bio: req.body.bio,
    coverPhoto: req.body.photoId,
    createdBy: req.session.userId
  };
  async.series(
    [
      cb =>
        validate.check(
          {
            bio: validate.notIsEmpty,
            coverPhoto: validate.required,
            createdBy: validate.required
          },
          biographyData,
          cb
        )
    ],
    async () => {
      const biographyOne = await BiographyModel.findOne().exec();
      if (!biographyOne) {
        return new BiographyModel(biographyData).save(err => {
          if (err) {
            Logger.error('err to create new biography' + err);
            return res.sendStatus(HTTPStatus.ServerError);
          }
          return res.sendStatus(HTTPStatus.OK);
        });
      }
      biographyOne.set(biographyData).save(err => {
        if (err) {
          Logger.error('err to update biography' + err);
          return res.sendStatus(HTTPStatus.ServerError);
        }
        return res.sendStatus(HTTPStatus.OK);
      });
    }
  );
};

export const getAdminBiography = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bioData = (await BiographyModel.findOne().lean()) as models.Biography;

  const payload = {
    photoId: bioData.coverPhoto,
    bioEn: bioData.bio.find(t => t.localeId === 'en').content,
    bioCs: bioData.bio.find(t => t.localeId === 'cs').content,
    bioRu: bioData.bio.find(t => t.localeId === 'ru').content,
    id: bioData.id
  };

  return res.send(payload).status(HTTPStatus.OK);
};
