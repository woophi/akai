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

  const biography: models.BiographySaveModel = {
    bio: [req.body.bio],
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
          biography,
          cb
        )
    ],
    async () => {

      const biographyOne = await BiographyModel.findOne().exec();
      if (!biographyOne) {
        return new BiographyModel(biography)
          .save(err => {
            if (err) {
              Logger.error('err to create new biography' + err);
              return res.sendStatus(HTTPStatus.ServerError);
            }
            return res.sendStatus(HTTPStatus.OK);
          });
      }

      return BiographyModel.findOne()
        .populate('coverPhoto')
        .exec((err, bio: models.Biography) => {
          if (err) {
            Logger.error('err to get biography' + err);
            return res.sendStatus(HTTPStatus.ServerError);
          }
          const sameLang = bio.bio.find(b => b.localeId === biography.bio[0].localeId);
          const newBios = sameLang
            ? bio.bio.filter(b => b.localeId !== sameLang.localeId)
            : bio.bio;
          bio.set({
            bio: [ ...newBios, biography.bio[0] ],
            coverPhoto: biography.coverPhoto
          })
          .save(err => {
            if (err) {
              Logger.error('err to create new biography' + err);
              return res.sendStatus(HTTPStatus.ServerError);
            }
            return res.sendStatus(HTTPStatus.OK);
          })
        });

    }
  );


};
