import { ensureAuthorizedForAdmin } from 'core/operations/auth';
import * as React from 'react';
import { AdminLayout } from 'ui/index';
import { AdminOrders } from 'ui/molecules/admin/orders';

const Orders = () => {
  React.useEffect(() => {
    ensureAuthorizedForAdmin();
  }, []);

  return (
    <AdminLayout>
      <AdminOrders />
    </AdminLayout>
  );
};

export default Orders;
