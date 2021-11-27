import { Response } from 'express';
import { ContainerTypes, ValidatedRequest, ValidatedRequestSchema } from 'express-joi-validation';
import Joi from 'joi';
import { getSessionData, HTTPStatus } from 'server/lib/models';
import { ShopOrderTable } from 'server/models/shopOrders';
import { CreateShopOrder, ShopOrderState } from 'server/models/types';

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

interface CreateOrder extends ValidatedRequestSchema {
  [ContainerTypes.Body]: CreateShopOrder;
}

export const createShopOrder = async (req: ValidatedRequest<CreateOrder>, res: Response) => {
  try {
    const newOrder = new ShopOrderTable({
      ...req.body,
      user: getSessionData(req.session).userId,
      orderId: (await ShopOrderTable.countDocuments()) + 1,
      orderState: ShopOrderState.Ordered,
    });

    await newOrder.save();

    return res.send({ orderId: newOrder.orderId }).status(HTTPStatus.OK);
  } catch (error) {
    console.error(error);
    return res.sendStatus(HTTPStatus.ServerError);
  }
};
