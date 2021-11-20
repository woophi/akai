import { ensureAuthorizedForAdmin } from 'core/operations/auth';
import * as React from 'react';
import { AdminLayout } from 'ui/index';
import { NewCategory } from 'ui/molecules/admin/shop';

const ShopNewCategory = React.memo(() => {
  React.useEffect(() => {
    ensureAuthorizedForAdmin();
  }, []);

  return (
    <AdminLayout>
      <NewCategory />
    </AdminLayout>
  );
});

export default ShopNewCategory;
