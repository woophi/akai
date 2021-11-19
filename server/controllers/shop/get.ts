import { Response } from 'express';
import { ContainerTypes, ValidatedRequest, ValidatedRequestSchema } from 'express-joi-validation';
import Joi from 'joi';
import { HTTPStatus } from 'server/lib/models';
import { ShopCategoryTable } from 'server/models/shopCategory';
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

const increaseView = async (id: string) => {
  try {
    await ShopItemTable.findByIdAndUpdate(id, {
      $inc: {
        views: 1,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

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
      .select('title files categories description price stock parameters href')
      .lean();

    if (!shopItem) {
      return res.sendStatus(HTTPStatus.NotFound);
    }

    increaseView(shopItem._id);

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

    const relatedProducts = await ShopItemTable.find({ deleted: null, _id: { $ne: shopItem._id } })
      .where('categories')
      .in([shopItem.categories[0]._id])
      .sort({ views: -1 })
      .limit(3)
      .populate({
        path: 'files',
        select: 'name url',
      })
      .populate({
        path: 'categories',
        select: 'name',
      })
      .select('title files categories price stock href')
      .lean();

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

      relatedProducts: relatedProducts.map(rp => ({
        title: rp.title[req.query.localeId],
        categories: rp.categories.map(c => c.name[req.query.localeId]),
        price: rp.price,
        stock: rp.stock,
        file: rp.files[0],
        href: rp.href,
        id: rp._id,
      })),
    };

    return res.send(data).status(HTTPStatus.OK);
  } catch (error) {
    console.error(error);
    return res.sendStatus(HTTPStatus.ServerError);
  }
};
export const getCategoryData = async (req: ValidatedRequest<GProductGet>, res: Response) => {
  try {
    const category = await ShopCategoryTable.findOne({ deleted: null, [`name.${req.query.localeId}`]: req.query.name })
      .populate({
        path: 'shopItems',
        select: 'title files price stock href',
        populate: {
          path: 'files',
          select: 'name url',
        },
      })
      .select('shopItems name')
      .lean();

    if (!category) {
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
      name: req.query.name,
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

      products: category.shopItems.map(rp => ({
        title: rp.title[req.query.localeId],
        price: rp.price,
        stock: rp.stock,
        file: rp.files[0],
        href: rp.href,
        id: rp._id,
      })),
    };

    return res.send(data).status(HTTPStatus.OK);
  } catch (error) {
    console.error(error);
    return res.sendStatus(HTTPStatus.ServerError);
  }
};
