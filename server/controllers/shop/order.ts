import { Response } from 'express';
import { ContainerTypes, ValidatedRequest, ValidatedRequestSchema } from 'express-joi-validation';
import Joi from 'joi';
import moment from 'moment';
import { getSessionData, HTTPStatus } from 'server/lib/models';
import ShopItemTable from 'server/models/shopItems';
import { ShopOrderTable } from 'server/models/shopOrders';
import { CreateShopOrder, Locales, ShopItem, ShopOrderState } from 'server/models/types';
import { updateShopOrderValidate, validateShopOrderBase } from 'server/validations';
import { sendShopOrderMailNotificationToAdmins, sendShopOrderMailNotificationToCustomer } from './mails';

export const createShopOrderValidate = validateShopOrderBase.append({
  items: Joi.array().items(Joi.string()).required(),
});
export const updateCustomerOrderValidate = updateShopOrderValidate.append({
  items: Joi.array().items(Joi.string()).required(),
});

interface CreateOrder extends ValidatedRequestSchema {
  [ContainerTypes.Body]: CreateShopOrder;
}
interface UpdateOrder extends ValidatedRequestSchema {
  [ContainerTypes.Body]: CreateShopOrder & {
    orderId: number;
  };
}
interface GetOrder extends ValidatedRequestSchema {
  [ContainerTypes.Params]: {
    orderId: string;
  };
}

export const createShopOrder = async (req: ValidatedRequest<CreateOrder>, res: Response) => {
  try {
    const newOrder = new ShopOrderTable({
      ...req.body,
      user: getSessionData(req.session).userId,
      orderId: (await ShopOrderTable.countDocuments()) + 1,
      orderState: ShopOrderState.Open,
    });

    await newOrder.save();

    return res.send({ orderId: newOrder.orderId }).status(HTTPStatus.OK);
  } catch (error) {
    console.error(error);
    return res.sendStatus(HTTPStatus.ServerError);
  }
};
export const updateShopOrder = async (req: ValidatedRequest<UpdateOrder>, res: Response) => {
  try {
    const order = await ShopOrderTable.findOne({ finished: null, orderId: req.body.orderId }).exec();

    if (!order) {
      return res.sendStatus(HTTPStatus.NotFound);
    }

    order.items = req.body.items as unknown as ShopItem[];
    order.orderState = ShopOrderState.Ordered;
    order.finished = moment().toDate();
    order.paidShipping = req.body.paidShipping;
    order.notes = req.body.notes;
    order.total = req.body.total;
    order.shipAddress = req.body.shipAddress;
    order.billAddress = req.body.billAddress;

    await order.save();

    for (const itemId of order.items) {
      await ShopItemTable.findByIdAndUpdate(itemId, {
        $inc: { stock: -1 },
      }).exec();
    }

    await order.populate({
      path: 'items',
      populate: {
        path: 'files',
        select: 'url',
      },
      select: 'files price',
    });
    sendShopOrderMailNotificationToAdmins(order);
    sendShopOrderMailNotificationToCustomer(order);

    return res.sendStatus(HTTPStatus.OK);
  } catch (error) {
    console.error(error);
    return res.sendStatus(HTTPStatus.ServerError);
  }
};

export const getCustomerShopOrder = async (req: ValidatedRequest<GetOrder>, res: Response) => {
  try {
    console.debug('req.params.orderId', req.params.orderId);
    const shopOrder = await ShopOrderTable.findOne()
      .where('uniqId', req.params.orderId)
      .populate({
        path: 'items',
        populate: {
          path: 'files',
          select: 'url',
        },
        select: 'files price title href',
      })
      .select('orderId items orderState paidShipping notes total billAddress shipAddress total refundReason')
      .lean();

    if (!shopOrder) return res.sendStatus(HTTPStatus.NotFound);

    const data = {
      ...shopOrder,
      items: shopOrder.items.map(it => ({
        id: it._id,
        url: it.files[0].url,
        title: it.title[req.query.localeId as Locales],
        price: it.price,
        href: it.href,
      })),
    };

    return res.send(data).status(HTTPStatus.OK);
  } catch (error) {
    console.error(error);
    return res.sendStatus(HTTPStatus.ServerError);
  }
};
