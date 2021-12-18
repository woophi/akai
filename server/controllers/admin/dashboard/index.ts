import BlogsModel from 'server/models/blog';
import { Request, Response } from 'express';
import { Logger } from 'server/logger';
import { HTTPStatus } from 'server/lib/models';
import ShopOrderTable from 'server/models/shopOrders';

type ResponseQuery = {
  _id: string;
  photos: {
    thumbnail: string;
  }[];
  views: number;
  title: {
    localeId: string;
    content: string;
  }[];
};

export const getTopFiveViewBlogs = async (req: Request, res: Response) => {
  try {
    const topBlogs = (await BlogsModel.find()
      .where('deleted', undefined)
      .sort({ views: -1 })
      .limit(5)
      .populate({
        path: 'photos',
        select: 'thumbnail -_id',
      })
      .select('title photos views')
      .lean()) as ResponseQuery[];

    const payload = topBlogs.map(tb => ({
      ...tb,
      photos: tb.photos.map(p => p.thumbnail),
      title: tb.title.find(t => t.localeId === 'ru')?.content,
    }));

    return res.send(payload).status(HTTPStatus.OK);
  } catch (error) {
    Logger.error(error);
    return res.status(HTTPStatus.Empty).send([]);
  }
};
export const getLastFiveOrders = async (req: Request, res: Response) => {
  try {
    const lastOrders = await ShopOrderTable.find()
      .sort({ orderId: -1 })
      .select('orderId orderState total billAddress total')
      .limit(5)
      .lean();

    return res
      .send(
        lastOrders.map(s => ({
          orderId: s.orderId,
          orderState: s.orderState,
          total: s.total,
          email: s.billAddress?.email,
          name: `${s.billAddress?.name} ${s.billAddress?.lastName}`,
        }))
      )
      .status(HTTPStatus.OK);
  } catch (error) {
    Logger.error(error);
    return res.status(HTTPStatus.Empty).send([]);
  }
};
