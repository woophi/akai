import { Response } from 'express';
import { ContainerTypes, ValidatedRequest, ValidatedRequestSchema } from 'express-joi-validation';
import Joi from 'joi';
import moment from 'moment';
import { getSessionData, HTTPStatus } from 'server/lib/models';
import { ShopOrderTable } from 'server/models/shopOrders';
import { CreateShopOrder, ShopItem, ShopOrderState } from 'server/models/types';

const shipAddressJoi = Joi.object({
  name: Joi.string().required(),
  lastName: Joi.string().required(),
  country: Joi.string().required(),
  streetAddress: Joi.string().required(),
  city: Joi.string().required(),
  postcode: Joi.string().required(),
  companyName: Joi.string().empty(''),
});
const billAddressJoi = shipAddressJoi.append({
  phone: Joi.string().required(),
  email: Joi.string().email().required(),
});

export const createShopOrderValidate = Joi.object({
  items: Joi.array().items(Joi.string()).required(),
  paidShipping: Joi.boolean().required(),
  notes: Joi.string().empty(''),
  total: Joi.number().required(),
  shipAddress: shipAddressJoi.allow(null),
  billAddress: billAddressJoi.required(),
});

export const updateShopOrderValidate = createShopOrderValidate.append({
  orderId: Joi.number().required(),
});
interface CreateOrder extends ValidatedRequestSchema {
  [ContainerTypes.Body]: CreateShopOrder;
}
interface UpdateOrder extends ValidatedRequestSchema {
  [ContainerTypes.Body]: CreateShopOrder & {
    orderId: number;
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

    return res.sendStatus(HTTPStatus.OK);
  } catch (error) {
    console.error(error);
    return res.sendStatus(HTTPStatus.ServerError);
  }
};
