import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EditIcon from '@material-ui/icons/Edit';
import Eye from '@material-ui/icons/RemoveRedEye';
import { goToSpecific } from 'core/common';
import { numberWithCommas } from 'core/lib';
import { BlogTopItem, ShopOrderItem } from 'core/models';
import * as React from 'react';
import { H1, Spinner, styleTruncate } from 'ui/atoms';
import { getAdminDashboard } from './operations';

const linkToBlog = (id: string) => {
  goToSpecific(`/admin/blogs/edit/${id}`);
};
const linkToOrder = (id: number) => {
  goToSpecific(`/admin/orders/${id}`);
};

export const AdminDashboard = React.memo(() => {
  const [blogs, setBlogs] = React.useState<BlogTopItem[]>([]);
  const [orders, setOrders] = React.useState<ShopOrderItem[]>([]);
  const [fetching, setFetching] = React.useState({ blogs: true, orders: true });
  React.useEffect(() => {
    getAdminDashboard()
      .then(p => {
        setBlogs(p[0]);
        setOrders(p[1]);
      })
      .finally(() => setFetching({ orders: false, blogs: false }));
  }, []);

  return (
    <>
      <H1>{'Топ 5 самых популярных блогов'}</H1>
      <Box flexDirection="column" flex={1}>
        {blogs.map(b => (
          <ListItem key={b._id} onClick={() => linkToBlog(b._id)}>
            <ListItemAvatar>
              <Avatar alt={b.title} src={b.photos[0]} />
            </ListItemAvatar>
            {b.title && <ListItemText primary={b.title} primaryTypographyProps={{ noWrap: true }} style={styleTruncate} />}
            <ListItemIcon>
              <>
                <Eye />
                <Box margin="auto">{b.views}</Box>
              </>
            </ListItemIcon>
            <ListItemIcon>
              <IconButton onClick={() => linkToBlog(b._id)}>
                <EditIcon />
              </IconButton>
            </ListItemIcon>
          </ListItem>
        ))}
        <Spinner isShow={fetching.blogs} />
      </Box>
      <H1>{'5 последних заказов'}</H1>
      <Box flexDirection="column" flex={1}>
        {orders.map(order => (
          <ListItem key={order.orderId}>
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              style={styleTruncate}
              primary={`(${order.orderId}) ${order.name} - ${order.email} - ${order.orderState}`}
              secondary={`$${numberWithCommas(order.total)}`}
              onClick={() => linkToOrder(order.orderId)}
            />
            <ListItemIcon>
              <IconButton onClick={() => linkToOrder(order.orderId)}>
                <EditIcon />
              </IconButton>
            </ListItemIcon>
          </ListItem>
        ))}
        <Spinner isShow={fetching.orders} />
      </Box>
    </>
  );
});
