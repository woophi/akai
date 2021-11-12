import { NextFunction, Request, Response } from 'express';
import { ContainerTypes, ValidatedRequest, ValidatedRequestSchema } from 'express-joi-validation';
import Joi from 'joi';
import { HTTPStatus } from 'server/lib/models';
import { ShopCategoryTable } from 'server/models/shopCategory';

export const getShopCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const items = await ShopCategoryTable.find().select('name').lean();
    return res.send(items).status(HTTPStatus.OK);
  } catch (error) {
    console.error(error);
    return res.sendStatus(HTTPStatus.ServerError);
  }
};

export const validateShopCategoryGet = Joi.object({
  id: Joi.string().required(),
});

interface ShopCategoryGet extends ValidatedRequestSchema {
  [ContainerTypes.Params]: {
    id: string;
  };
}

export const getShopCategory = async (req: ValidatedRequest<ShopCategoryGet>, res: Response, next: NextFunction) => {
  try {
    const category = await ShopCategoryTable.findById(req.params.id).populate('shopItems').select('name shopItems').lean();
    return res.send(category).status(HTTPStatus.OK);
  } catch (error) {
    console.error(error);
    return res.sendStatus(HTTPStatus.ServerError);
  }
};
