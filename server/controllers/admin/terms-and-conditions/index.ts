import { Response } from 'express';
import { ContainerTypes, ValidatedRequest, ValidatedRequestSchema } from 'express-joi-validation';
import Joi from 'joi';
import { HTTPStatus } from 'server/lib/models';
import { TermsConditionsTable } from 'server/models/termsConditions';
import { LanguageMap } from 'server/models/types';
import { languageContent } from 'server/validations';

export const validateTermsAndConditions = Joi.object({
  tcText: languageContent.required(),
  id: Joi.string().allow(null),
});

interface TermsAndConditionsSave extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    tcText: LanguageMap;
  };
}

export const saveTermsAndConditions = async (req: ValidatedRequest<TermsAndConditionsSave>, res: Response) => {
  try {
    const existsOne = await TermsConditionsTable.findOne().exec();

    if (!existsOne) {
      const newTC = new TermsConditionsTable(req.body);
      await newTC.save();
    } else {
      existsOne.tcText = req.body.tcText;
      await existsOne.save();
    }
    return res.sendStatus(HTTPStatus.OK);
  } catch (error) {
    console.error(error);
    return res.sendStatus(HTTPStatus.ServerError);
  }
};
export const getTermsAndConditions = async (req: ValidatedRequest<TermsAndConditionsSave>, res: Response) => {
  try {
    const existsOne = await TermsConditionsTable.findOne().lean();

    const data = existsOne ? { tcText: existsOne.tcText, id: existsOne._id } : { tcText: {}, id: null };
    return res.send(data).status(HTTPStatus.OK);
  } catch (error) {
    console.error(error);
    return res.sendStatus(HTTPStatus.ServerError);
  }
};
