import { NextFunction, Response } from 'express';
import { ContainerTypes, ValidatedRequest, ValidatedRequestSchema } from 'express-joi-validation';
import Joi from 'joi';
import moment from 'moment';
import { HTTPStatus } from 'server/lib/models';
import { ShopItemTable } from 'server/models/shopItems';
import { ShopCategoryTable } from 'server/models/shopCategory';
import { Locales, ShopItemSaveModel } from 'server/models/types';
import { languageContent } from 'server/validations';
import { parseProductHref } from 'server/utils/format';

export const validateShopItemSave = Joi.object({
  title: languageContent.required(),
  description: languageContent.required(),
  files: Joi.array().items(Joi.string()).required(),
  categories: Joi.array().items(Joi.string()).required(),
  parameters: Joi.array(),
  stock: Joi.number().required(),
  price: Joi.number().required(),
});

export const validateShopItemUpdate = validateShopItemSave.append({
  _id: Joi.string().required(),
});

interface ShopItemSave extends ValidatedRequestSchema {
  [ContainerTypes.Body]: ShopItemSaveModel;
}
interface ShopItemUpdate extends ValidatedRequestSchema {
  [ContainerTypes.Body]: ShopItemSaveModel & {
    _id: string;
  };
}
interface ShopItemGet extends ValidatedRequestSchema {
  [ContainerTypes.Params]: {
    id: string;
  };
}

export const createShopItem = async (req: ValidatedRequest<ShopItemSave>, res: Response, next: NextFunction) => {
  try {
    const newShopItem = new ShopItemTable({
      ...req.body,
      href: parseProductHref(req.body.title[Locales.EN]),
    });
    await newShopItem.save();
    if (req.body.categories.length) {
      for (const categoryId of req.body.categories) {
        await ShopCategoryTable.findByIdAndUpdate(categoryId, {
          $push: { shopItems: newShopItem.id },
        }).exec();
      }
    }
    return res.sendStatus(HTTPStatus.OK);
  } catch (error) {
    console.error(error);
    return res.sendStatus(HTTPStatus.ServerError);
  }
};
export const updateShopItem = async (req: ValidatedRequest<ShopItemUpdate>, res: Response, next: NextFunction) => {
  try {
    const shopItem = await ShopItemTable.findById(req.body._id).where('deleted', null).exec();
    if (!shopItem) {
      return res.sendStatus(HTTPStatus.NotFound);
    }
    const oldCategories = shopItem.categories;
    shopItem.title = req.body.title;
    shopItem.href = parseProductHref(req.body.title[Locales.EN]);
    shopItem.description = req.body.description;
    shopItem.categories = req.body.categories;
    shopItem.files = req.body.files;
    shopItem.parameters = req.body.parameters;
    shopItem.price = req.body.price;
    shopItem.stock = req.body.stock;
    await shopItem.save();
    for (const categoryId of oldCategories) {
      await ShopCategoryTable.findByIdAndUpdate(categoryId, {
        $pull: { shopItems: shopItem.id },
      }).exec();
    }
    for (const categoryId of req.body.categories) {
      await ShopCategoryTable.findByIdAndUpdate(categoryId, {
        $push: { shopItems: shopItem.id },
      }).exec();
    }
    return res.sendStatus(HTTPStatus.OK);
  } catch (error) {
    console.error(error);
    return res.sendStatus(HTTPStatus.ServerError);
  }
};
export const deleteShopItem = async (req: ValidatedRequest<ShopItemGet>, res: Response, next: NextFunction) => {
  try {
    const shopItem = await ShopItemTable.findById(req.params.id).where('deleted', null).exec();
    if (!shopItem) {
      return res.sendStatus(HTTPStatus.NotFound);
    }
    for (const categoryId of shopItem.categories) {
      await ShopCategoryTable.findByIdAndUpdate(categoryId, {
        $pull: { shopItems: shopItem.id },
      }).exec();
    }
    shopItem.deleted = moment().toDate();

    await shopItem.save();
    return res.sendStatus(HTTPStatus.OK);
  } catch (error) {
    console.error(error);
    return res.sendStatus(HTTPStatus.ServerError);
  }
};
