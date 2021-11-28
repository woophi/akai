import { Request, Response } from 'express';
import { HTTPStatus } from 'server/lib/models';
import ShopOrderTable from 'server/models/shopOrders';

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
