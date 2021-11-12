import { ensureNotAuthorized } from 'core/operations/auth';
import * as React from 'react';
import { AdminLayout } from 'ui/index';

const ShopNewCategory = React.memo(() => {
  React.useEffect(() => {
    ensureNotAuthorized();
  }, []);

  return <AdminLayout>new</AdminLayout>;
});

export default ShopNewCategory;
