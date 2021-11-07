import { NextFunction, Request, Response } from 'express';
import { HTTPStatus } from 'server/lib/models';
import SliderModel from 'server/models/slider';

export const getSlidesForGuest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sliders = await SliderModel.find()
      .populate({
        path: 'slide',
        select: 'name url',
      })
      .sort({ ordinal: 1 })
      .lean();
    const slides = sliders.map(slide => ({
      src: slide.slide.url,
      name: slide.slide.name,
    }));
    return res.send(slides).status(HTTPStatus.OK);
  } catch (error) {
    console.error(error);
    res.send([]).status(HTTPStatus.ServerError);
  }
};
