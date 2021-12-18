import { Request, Response } from 'express';
import { getSessionData, HTTPStatus } from 'server/lib/models';
import ShopOrderTable from 'server/models/shopOrders';

export const getUserShopOrders = async (req: Request, res: Response) => {
  try {
    const shopOrders = await ShopOrderTable.find()
      .where('user', getSessionData(req.session).userId)
      .select('orderId orderState total billAddress total uniqId')
      .lean();

    return res
      .send(
        shopOrders.map(s => ({
          orderId: s.orderId,
          orderState: s.orderState,
          total: s.total,
          email: s.billAddress?.email,
          name: `${s.billAddress?.name} ${s.billAddress?.lastName}`,
          uniqId: s.uniqId,
        }))
      )
      .status(HTTPStatus.OK);
  } catch (error) {
    console.error(error);
    return res.sendStatus(HTTPStatus.ServerError);
  }
};
