import { ensureNotAuthorized } from 'core/operations/auth';
import * as React from 'react';
import { AdminLayout } from 'ui/index';

const ShopNewItem = React.memo(() => {
  React.useEffect(() => {
    ensureNotAuthorized();
  }, []);

  return <AdminLayout>new</AdminLayout>;
});

export default ShopNewItem;
