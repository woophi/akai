import { Request, Response, NextFunction } from 'express';
import SliderModel from 'server/models/slider';
import * as models from 'server/models/types';
import { Logger } from 'server/logger';

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
    .exec((err, sliders: models.Slider[]) => {
      if (err) {
        Logger.error(err);
        res.sendStatus(500);
      }
      if (!sliders) {
        res.send([]).status(200);
      }
      const slides = sliders
        .sort((first, second) => first.ordinal - second.ordinal)
        .map(slide => ({
          src: slide.slide.url,
          name: slide.slide.name
        }));
      return res.send(slides).status(200);
    });
};
