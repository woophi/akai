import { NextFunction, Request, Response } from 'express';
import { HTTPStatus } from 'server/lib/models';
import { ShopItemTable } from 'server/models/shopItems';
import Joi from 'joi';
import { ContainerTypes, ValidatedRequest, ValidatedRequestSchema } from 'express-joi-validation';

export const getShopItems = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const items = await ShopItemTable.find()
      .where('deleted', null)
      .populate('files')
      .select('title price stock files')
      .lean();
    return res.send(items).status(HTTPStatus.OK);
  } catch (error) {
    console.error(error);
    return res.sendStatus(HTTPStatus.ServerError);
  }
};

export const validateShopItemGet = Joi.object({
  id: Joi.string().required(),
});

interface ShopItemGet extends ValidatedRequestSchema {
  [ContainerTypes.Params]: {
    id: string;
  };
}

export const getShopItem = async (req: ValidatedRequest<ShopItemGet>, res: Response, next: NextFunction) => {
  try {
    const shopItem = await ShopItemTable.findById(req.params.id)
      .where('deleted', null)
      .select('title files categories description price stock parameters')
      .lean();
    return res.send(shopItem).status(HTTPStatus.OK);
  } catch (error) {
    console.error(error);
    return res.sendStatus(HTTPStatus.ServerError);
  }
};
