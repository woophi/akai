import { Response } from 'express';
import { ContainerTypes, ValidatedRequest, ValidatedRequestSchema } from 'express-joi-validation';
import Joi from 'joi';
import { HTTPStatus } from 'server/lib/models';
import ShopOrderTable from 'server/models/shopOrders';
import { UpdateAdminShopOrder } from 'server/models/types';
import { updateShopOrderValidate } from 'server/validations';

export const validateAdminOrderUpdate = updateShopOrderValidate.append({
  orderState: Joi.string().required(),
  refundReason: Joi.string().empty(''),
});

interface AdminOrderUpdate extends ValidatedRequestSchema {
  [ContainerTypes.Body]: UpdateAdminShopOrder;
}

export const updateAdminShopOrder = async (req: ValidatedRequest<AdminOrderUpdate>, res: Response) => {
  try {
    const order = await ShopOrderTable.findOne({ orderId: req.body.orderId }).exec();

    if (!order) {
      return res.sendStatus(HTTPStatus.NotFound);
    }

    order.orderState = req.body.orderState;
    order.paidShipping = req.body.paidShipping;
    order.notes = req.body.notes;
    order.total = req.body.total;
    order.shipAddress = req.body.shipAddress;
    order.billAddress = req.body.billAddress;

    await order.save();

    return res.sendStatus(HTTPStatus.OK);
  } catch (error) {
    console.error(error);
    return res.sendStatus(HTTPStatus.ServerError);
  }
};
