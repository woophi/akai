import { Response } from 'express';
import { ContainerTypes, ValidatedRequest, ValidatedRequestSchema } from 'express-joi-validation';
import { HTTPStatus } from 'server/lib/models';
import { TermsConditionsTable } from 'server/models/termsConditions';
import { Locales } from 'server/models/types';

interface TermsAndConditionsGet extends ValidatedRequestSchema {
  [ContainerTypes.Query]: {
    localeId: Locales;
  };
}
export const getGuestTermsAndConditions = async (req: ValidatedRequest<TermsAndConditionsGet>, res: Response) => {
  try {
    const existsOne = await TermsConditionsTable.findOne().lean();

    const data = existsOne ? existsOne.tcText[req.query.localeId] : '';
    return res.send(data).status(HTTPStatus.OK);
  } catch (error) {
    console.error(error);
    return res.sendStatus(HTTPStatus.ServerError);
  }
};
