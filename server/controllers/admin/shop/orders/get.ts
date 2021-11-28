import { Request, Response } from 'express';
import { ContainerTypes, ValidatedRequest, ValidatedRequestSchema } from 'express-joi-validation';
import Joi from 'joi';
import { HTTPStatus } from 'server/lib/models';
import ShopOrderTable from 'server/models/shopOrders';
import { Locales } from 'server/models/types';

export const getAdminShopOrders = async (req: Request, res: Response) => {
  try {
    const shopOrders = await ShopOrderTable.find()
      .sort({ orderId: -1 })
      .select('orderId orderState total billAddress total')
      .lean();

    return res
      .send(
        shopOrders.map(s => ({
          orderId: s.orderId,
          orderState: s.orderState,
          total: s.total,
          email: s.billAddress?.email,
          name: `${s.billAddress?.name} ${s.billAddress?.lastName}`,
        }))
      )
      .status(HTTPStatus.OK);
  } catch (error) {
    console.error(error);
    return res.sendStatus(HTTPStatus.ServerError);
  }
};

export const validateAdminOrderGet = Joi.object({
  orderId: Joi.string().required(),
});

interface AdminOrderGet extends ValidatedRequestSchema {
  [ContainerTypes.Params]: {
    orderId: string;
  };
}

export const getAdminShopOrder = async (req: ValidatedRequest<AdminOrderGet>, res: Response) => {
  try {
    const shopOrder = await ShopOrderTable.findOne({ orderId: Number(req.params.orderId) })
      .populate({
        path: 'items',
        populate: {
          path: 'files',
          select: 'url',
        },
        select: 'files price title stock',
      })
      .select('orderId items orderState paidShipping notes total billAddress shipAddress total refundReason')
      .lean();

    if (!shopOrder) return res.sendStatus(HTTPStatus.NotFound);

    const data = {
      ...shopOrder,
      items: shopOrder.items.map(it => ({
        id: it._id,
        url: it.files[0].url,
        title: it.title[Locales.RU],
        price: it.price,
        stock: it.stock,
      })),
    };

    return res.send(data).status(HTTPStatus.OK);
  } catch (error) {
    console.error(error);
    return res.sendStatus(HTTPStatus.ServerError);
  }
};
