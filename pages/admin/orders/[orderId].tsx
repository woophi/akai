import { ensureAuthorizedForAdmin } from 'core/operations/auth';
import { adminShopActions } from 'core/reducers/admin/shop';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { AdminLayout } from 'ui/index';
import { AdminOrder } from 'ui/molecules/admin/orders';
import { getOrder } from 'ui/molecules/admin/orders/operations';

const Order = () => {
  const dispatch = useDispatch();
  const { query } = useRouter();
  const orderId = Number(query.orderId);

  React.useEffect(() => {
    ensureAuthorizedForAdmin();
    getOrder(orderId)
      .then(o => dispatch(adminShopActions.selectOrder(o)))
      .catch(console.error);
  }, [orderId]);

  return (
    <AdminLayout>
      <AdminOrder />
    </AdminLayout>
  );
};

export default Order;
