import config from 'server/config';
import { ROLES } from 'server/identity';
import { Mailer } from 'server/mails';
import { EmailTemplate } from 'server/mails/types';
import { ShopOrder } from 'server/models/types';
import { UserTable } from 'server/models/users';

export const sendShopOrderMailNotificationToAdmins = async (order: ShopOrder) => {
  try {
    const adminEmails = await UserTable.find().where('roles').in([ROLES.ADMIN, ROLES.GODLIKE]).select('email -_id').lean();
    const addresses = adminEmails.map(ue => ue.email);

    const mailer = new Mailer(
      'message to admins about order',
      EmailTemplate.order,
      addresses,
      `Новый заказ картины № ${order.orderId}`,
      '',
      'Администрация сайта',
      {
        total: order.total,
        shipAddress: order.shipAddress,
        billAddress: order.billAddress,
        paidShipping: order.paidShipping,
        notes: order.notes,
        items: order.items.map(i => ({
          img: i.files[0].url,
          price: i.price,
        })),
        orderUrl: `${config.SITE_URI}admin/order/${order.orderId}`,
      }
    );
    mailer.performQueue();
  } catch (error) {
    console.error('Cant send email notification about new order');
    console.error(error);
  }
};
export const sendShopOrderMailNotificationToCustomer = async (order: ShopOrder) => {
  try {
    const addresses = [order.billAddress?.email ?? ''];

    const mailer = new Mailer(
      'message to customer about order',
      EmailTemplate.orderCustomer,
      addresses,
      `New order confirmation № ${order.orderId}`,
      '',
      'Site administration',
      {
        orderId: order.orderId,
        total: order.total,
        shipAddress: order.shipAddress,
        billAddress: order.billAddress,
        paidShipping: order.paidShipping,
        notes: order.notes,
        items: order.items.map(i => ({
          img: i.files[0].url,
          price: i.price,
        })),
        orderUrl: `${config.SITE_URI}shop/order/${order.uniqId}`,
      }
    );
    mailer.performQueue();
  } catch (error) {
    console.error('Cant send email notification about new order');
    console.error(error);
  }
};
