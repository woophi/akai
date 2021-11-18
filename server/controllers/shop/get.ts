import { Response } from 'express';
import { ContainerTypes, ValidatedRequest, ValidatedRequestSchema } from 'express-joi-validation';
import Joi from 'joi';
import { HTTPStatus } from 'server/lib/models';
import { ShopItemTable } from 'server/models/shopItems';
import { Locales } from 'server/models/types';

export const validateGProductGet = Joi.object({
  name: Joi.string().required(),
  localeId: Joi.string().required(),
});

interface GProductGet extends ValidatedRequestSchema {
  [ContainerTypes.Query]: {
    name: string;
    localeId: Locales;
  };
}

export const getProductData = async (req: ValidatedRequest<GProductGet>, res: Response) => {
  try {
    const shopItem = await ShopItemTable.findOne({ deleted: null, href: req.query.name })
      .populate({
        path: 'files',
        select: 'name url',
      })
      .populate({
        path: 'categories',
        select: 'name',
      })
      .select('title files categories description price stock parameters')
      .lean();

    if (!shopItem) {
      return res.sendStatus(HTTPStatus.NotFound);
    }

    const recentlyAddedProduct = (
      await ShopItemTable.find({ deleted: null })
        .sort({ createdAt: -1 })
        .limit(1)
        .populate({
          path: 'files',
          select: 'name url',
        })
        .populate({
          path: 'categories',
          select: 'name',
        })
        .select('title files categories price stock href')
        .lean()
    )[0];

    const data = {
      ...shopItem,
      title: shopItem.title[req.query.localeId],
      description: shopItem.description[req.query.localeId],
      parameters: shopItem.parameters?.filter(p => p.localeId === req.query.localeId) ?? [],
      categories: shopItem.categories.map(c => c.name[req.query.localeId]),
      recentlyAddedProduct: recentlyAddedProduct
        ? {
            title: recentlyAddedProduct.title[req.query.localeId],
            categories: recentlyAddedProduct.categories.map(c => c.name[req.query.localeId]),
            price: recentlyAddedProduct.price,
            stock: recentlyAddedProduct.stock,
            file: recentlyAddedProduct.files[0],
            href: recentlyAddedProduct.href,
          }
        : null,
    };
    return res.send(data).status(HTTPStatus.OK);
  } catch (error) {
    console.error(error);
    return res.sendStatus(HTTPStatus.ServerError);
  }
};
