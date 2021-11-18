import { NextFunction, Response } from 'express';
import { ContainerTypes, ValidatedRequest, ValidatedRequestSchema } from 'express-joi-validation';
import Joi from 'joi';
import { HTTPStatus } from 'server/lib/models';
import SliderModel from 'server/models/slider';
import { Locales } from 'server/models/types';

export const validateSlidesGet = Joi.object({
  localeId: Joi.string().required(),
});

interface SlidesGet extends ValidatedRequestSchema {
  [ContainerTypes.Query]: {
    localeId: Locales;
  };
}

export const getSlidesForGuest = async (req: ValidatedRequest<SlidesGet>, res: Response, next: NextFunction) => {
  try {
    const sliders = await SliderModel.find()
      .populate({
        path: 'slide',
        select: 'name url',
      })
      .populate({
        path: 'button.shopItem',
        select: 'href',
        match: { deleted: null },
      })
      .sort({ ordinal: 1 })
      .lean();
    const slides = sliders.map(s => ({
      src: s.slide.url,
      name: s.slide.name,
      id: s._id,
      title: s.title?.[req.query.localeId],
      subTitle: s.subTitle?.[req.query.localeId],
      button: s.button
        ? {
            name: s.button.name?.[req.query.localeId],
            shopItemHref: s.button.shopItem?.href,
          }
        : {},
    }));
    return res.send(slides).status(HTTPStatus.OK);
  } catch (error) {
    console.error(error);
    res.send([]).status(HTTPStatus.ServerError);
  }
};
