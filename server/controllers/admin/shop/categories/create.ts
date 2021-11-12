import { NextFunction, Response } from 'express';
import { ContainerTypes, ValidatedRequest, ValidatedRequestSchema } from 'express-joi-validation';
import Joi from 'joi';
import moment from 'moment';
import { HTTPStatus } from 'server/lib/models';
import ShopCategoryTable from 'server/models/shopCategory';
import { LanguageMap, ShopItem } from 'server/models/types';
import { languageContent } from 'server/validations';

export const validateShopCategorySave = Joi.object({
  name: languageContent.required(),
  shopItems: Joi.array().items(Joi.string()).required(),
});
export const validateShopCategoryUpdate = validateShopCategorySave.append({
  _id: Joi.string().required(),
});

interface ShopCategorySave extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    name: LanguageMap;
    shopItems: string[];
  };
}
interface ShopCategoryUpdate extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    name: LanguageMap;
    shopItems: string[];
    _id: string;
  };
}
interface ShopCategoryGet extends ValidatedRequestSchema {
  [ContainerTypes.Params]: {
    id: string;
  };
}

export const createShopCategory = async (req: ValidatedRequest<ShopCategorySave>, res: Response, next: NextFunction) => {
  try {
    const newShopCategory = new ShopCategoryTable(req.body);
    await newShopCategory.save();
    return res.sendStatus(HTTPStatus.OK);
  } catch (error) {
    console.error(error);
    return res.sendStatus(HTTPStatus.ServerError);
  }
};
export const updateShopCategory = async (req: ValidatedRequest<ShopCategoryUpdate>, res: Response, next: NextFunction) => {
  try {
    const shopCategory = await ShopCategoryTable.findById(req.body._id).where('deleted', null).exec();
    if (!shopCategory) {
      return res.sendStatus(HTTPStatus.NotFound);
    }
    shopCategory.name = req.body.name;
    shopCategory.shopItems = req.body.shopItems as unknown as ShopItem[];
    await shopCategory.save();
    return res.sendStatus(HTTPStatus.OK);
  } catch (error) {
    console.error(error);
    return res.sendStatus(HTTPStatus.ServerError);
  }
};
export const deleteShopCategory = async (req: ValidatedRequest<ShopCategoryGet>, res: Response, next: NextFunction) => {
  try {
    const shopCategory = await ShopCategoryTable.findById(req.params.id).where('deleted', null).exec();
    if (!shopCategory) {
      return res.sendStatus(HTTPStatus.NotFound);
    }
    shopCategory.deleted = moment().toDate();

    await shopCategory.save();
    return res.sendStatus(HTTPStatus.OK);
  } catch (error) {
    console.error(error);
    return res.sendStatus(HTTPStatus.ServerError);
  }
};
