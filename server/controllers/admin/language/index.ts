import { Request, Response, NextFunction } from 'express';
import LanguageModel from '../../../models/language';
import * as models from '../../../models/types';
import { Logger } from '../../../logger';
import * as kia from '../../../validator';
import * as async from 'async';

export const createNewLanguage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validate = new kia.Validator(req, res, next);

  Logger.debug(
    `starting to create new language ${new Date().toLocaleTimeString()}`
  );

  const languageData: models.LanguageModel = {
    localeId: req.body.localeId,
    name: req.body.name
  };
  async.series(
    [
      cb =>
        validate.check(
          {
            localeId: validate.required,
            name: validate.required,
          },
          languageData,
          cb
        ),
      cb => {
        LanguageModel
          .findOne()
          .where('localeId', languageData.localeId)
          .exec((err, result) => {
            if (err) {
              Logger.error(err);
              return cb(err);
            }
            if (result)
              return res.send({ error: 'LanguageModel already exists' });
            return cb();
          });
      }
    ],
    () => {
      const newLanguage = new LanguageModel(languageData);
      return newLanguage.save((err, language) => {
        if (err) {
          Logger.error('err to save new language ' + err);
          return res.sendStatus(500);
        }
        Logger.debug('new language saved');
        return res.sendStatus(200);
      });
    }
  );
}
export const toggleActivationLanguage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validate = new kia.Validator(req, res, next);

  const languageData: Partial<models.LanguageModel> = {
    localeId: req.body.localeId
  };
  async.series(
    [
      cb =>
        validate.check(
          {
            localeId: validate.required
          },
          languageData,
          cb
        )
    ],
    () => {
      LanguageModel
        .findOne()
        .where('localeId', languageData.localeId)
        .exec((err, result: models.Language) => {
          if (err) {
            Logger.error(err);
            return res.sendStatus(500);
          }
          if (!result)
            return res.send({ error: 'LanguageModel not found' }).status(404);

          const toggle = result.deleted ? undefined : Date.now();
          result
            .set('deleted', toggle)
            .save(err => {
              if (err)
                return res.sendStatus(500);
              return res.sendStatus(200);
            })
        });
    }
  );
}
