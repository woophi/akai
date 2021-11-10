import { Request, Response, NextFunction } from 'express';
import SliderModel from 'server/models/slider';
import * as models from 'server/models/types';
import { Logger } from 'server/logger';
import * as kia from 'server/validator';
import * as async from 'async';
import { HTTPStatus } from 'server/lib/models';

type OrdinalModel = {
  id?: string;
  ordinal: number;
  fileId: string;
};

export const updateMainSlider = async (req: Request, res: Response, next: NextFunction) => {
  const validate = new kia.Validator(req, res, next);

  const slidersData: {
    slides: OrdinalModel[];
  } = {
    slides: req.body.slides,
  };
  async.series(
    [
      cb =>
        validate.check(
          {
            slides: validate.notIsEmpty,
          },
          slidersData,
          cb
        ),
      cb => {
        SliderModel.find().exec((err, slides: models.Slider[]) => {
          if (err) {
            Logger.error('err to get SliderModel ', err);
            return res.sendStatus(HTTPStatus.ServerError);
          }
          if (!slides || !slides.length) {
            return cb();
          }
          const shouldBeDeleted = slides.filter(
            s => !slidersData.slides.find(us => (us.id ? us.id == s._id.toString() : false))
          );

          if (shouldBeDeleted.length) {
            const deleteSlide = (slide: models.Slider, callback: async.ErrorCallback<Error>) => slide.remove(callback);

            async.eachSeries(
              shouldBeDeleted,
              (slide: models.Slider, callback) => deleteSlide(slide, callback),
              err => {
                if (err) {
                  return res.sendStatus(HTTPStatus.ServerError);
                }
                Logger.debug('all others SliderModels deleted');
                return cb();
              }
            );
          } else {
            return cb();
          }
        });
      },
    ],
    () => {
      const saveModel = async (slide: OrdinalModel, callback: async.ErrorCallback<Error>) => {
        if (slide.id) {
          SliderModel.findByIdAndUpdate(
            slide.id,
            { ordinal: slide.ordinal, slide: slide.fileId as unknown as models.File },
            err => {
              if (err) {
                Logger.error('err to update SliderModel ', err, slide.id);
                return callback(err);
              }
              return callback();
            }
          );
        } else {
          new SliderModel({ slide: slide.fileId, ordinal: slide.ordinal }).save(err => {
            if (err) {
              Logger.error('err to save new SliderModel ' + err);
              return callback(err);
            }
            return callback();
          });
        }
      };
      async.eachSeries(
        slidersData.slides,
        (slide: OrdinalModel, callback) => saveModel(slide, callback),
        err => {
          if (err) {
            return res.sendStatus(HTTPStatus.ServerError);
          }
          Logger.debug('all SliderModels saved');
          return res.sendStatus(HTTPStatus.OK);
        }
      );
    }
  );
};

export const getAdminSlider = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const slides = (await SliderModel.find().populate('slide').sort({ ordinal: 1 }).lean()) as models.Slider[];
    const payload = slides.map(s => ({
      id: s._id,
      file: s.slide,
      ordinal: s.ordinal,
    }));
    return res.send(payload).status(HTTPStatus.OK);
  } catch (error) {
    Logger.error('err to get SliderModel ', error);
    return res.sendStatus(HTTPStatus.ServerError);
  }
};
