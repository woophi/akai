import { Request, Response, NextFunction } from 'express';
import SliderModel from 'server/models/slider';
import * as models from 'server/models/types';
import { Logger } from 'server/logger';
import { HTTPStatus } from 'server/lib/models';

export const getSlidesForGuest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return SliderModel.find()
    .populate({
      path: 'slide',
      select: 'name url'
    })
    .sort({ ordinal: 1 })
    .exec((err, sliders: models.Slider[]) => {
      if (err) {
        Logger.error(err);
        res.sendStatus(HTTPStatus.ServerError);
      }
      if (!sliders) {
        res.send([]).status(HTTPStatus.OK);
      }
      const slides = sliders
        .map(slide => ({
          src: slide.slide.url,
          name: slide.slide.name
        }));
      return res.send(slides).status(HTTPStatus.OK);
    });
};
