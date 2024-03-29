import { ensureAuthorizedForAdmin } from 'core/operations/auth';
import * as React from 'react';
import { AdminLayout } from 'ui/index';
import { NewProduct } from 'ui/molecules/admin/shop/NewProduct';

const ShopNewItem = React.memo(() => {
  React.useEffect(() => {
    ensureAuthorizedForAdmin();
  }, []);

  return (
    <AdminLayout>
      <NewProduct />
    </AdminLayout>
  );
});

export default ShopNewItem;
