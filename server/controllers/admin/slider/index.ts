import { NextFunction, Request, Response } from 'express';
import { ContainerTypes, ValidatedRequest, ValidatedRequestSchema } from 'express-joi-validation';
import Joi from 'joi';
import { HTTPStatus } from 'server/lib/models';
import { Logger } from 'server/logger';
import SliderModel from 'server/models/slider';
import * as models from 'server/models/types';
import { LanguageMap } from 'server/models/types';
import { languageContent } from 'server/validations';

type OrdinalModel = {
  id?: string;
  ordinal: number;
  fileId: string;
  title?: LanguageMap;
  subTitle?: LanguageMap;
  button: {
    link: string | null;
    name?: LanguageMap;
  };
};

const slideValidate = Joi.object({
  id: Joi.string(),
  ordinal: Joi.number().required(),
  fileId: Joi.string().required(),
  title: languageContent,
  subTitle: languageContent,
  button: Joi.object({
    link: Joi.string().allow(null),
    name: languageContent,
  }),
});

export const validateSlideSave = Joi.object({
  slides: Joi.array().items(slideValidate).required(),
});
interface SlideSave extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    slides: OrdinalModel[];
  };
}

export const updateMainSlider = async (req: ValidatedRequest<SlideSave>, res: Response, next: NextFunction) => {
  const allSlides = await SliderModel.find().exec();

  const payload = req.body.slides;
  const shouldBeDeleted = allSlides.filter(s => !payload.find(us => (us.id ? us.id == s._id.toString() : false)));

  for (const toDelete of shouldBeDeleted) {
    await toDelete.remove();
  }

  for (const newSlide of payload) {
    if (newSlide.id) {
      await SliderModel.findByIdAndUpdate(newSlide.id, {
        ordinal: newSlide.ordinal,
        slide: newSlide.fileId as unknown as models.File,
        title: newSlide.title,
        subTitle: newSlide.subTitle,
        button: newSlide.button,
      });
    } else {
      await new SliderModel({
        slide: newSlide.fileId,
        ordinal: newSlide.ordinal,
        title: newSlide.title,
        subTitle: newSlide.subTitle,
        button: newSlide.button,
      }).save();
    }
  }
  return res.sendStatus(HTTPStatus.OK);
};

export const getAdminSlider = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const slides = await SliderModel.find().populate('slide').sort({ ordinal: 1 }).lean();
    const payload = slides.map(s => ({
      id: s._id,
      file: s.slide,
      ordinal: s.ordinal,
      title: s.title,
      subTitle: s.subTitle,
      button: s.button,
    }));
    return res.send(payload).status(HTTPStatus.OK);
  } catch (error) {
    Logger.error('err to get SliderModel ', error);
    return res.sendStatus(HTTPStatus.ServerError);
  }
};
