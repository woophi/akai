import { Request, Response, NextFunction } from 'express';
import SliderModel from '../../../models/slider';
import { Logger } from '../../../logger';
import * as kia from '../../../validator';
import * as async from 'async';

export const createNewSlides = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validate = new kia.Validator(req, res, next);

  Logger.debug(`starting to create new sliders ${new Date().toLocaleTimeString()}`);

  const slidersData = {
    fileIds: req.body.fileIds
  };
  async.series(
    [
      cb =>
        validate.check(
          {
            fileIds: validate.notIsEmpty
          },
          slidersData,
          cb
        )
    ],
    () => {
      const saveModel = async (fileId: string, callback) => {
        const allsliders = await SliderModel.find().exec();
        new SliderModel({ slide: fileId, ordinal: allsliders.length + 1 }).save(
          err => {
            if (err) {
              Logger.error('err to save new SliderModel ' + err);
              return callback(err);
            }
            return callback();
          }
        );
      };
      async.eachSeries(
        slidersData.fileIds,
        (item: string, callback) => saveModel(item, callback),
        err => {
          if (err) {
            return res.sendStatus(500);
          }
          Logger.debug('all SliderModels saved');
          return res.sendStatus(200);
        }
      );
    }
  );
};
