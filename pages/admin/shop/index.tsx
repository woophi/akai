import { Box } from '@material-ui/core';
import { ensureAuthorizedForAdmin } from 'core/operations/auth';
import * as React from 'react';
import { AdminLayout, LinkButton } from 'ui/index';
import { AdminShopCategories, AdminShopProducts } from 'ui/molecules/admin/shop';

const Shop = React.memo(() => {
  React.useEffect(() => {
    ensureAuthorizedForAdmin();
  }, []);

  return (
    <AdminLayout>
      <Box flexDirection="column" flex={1}>
        <Box display="flex" flexWrap="wrap">
          <LinkButton
            href="/admin/shop/category/new"
            color="primary"
            variant="contained"
            label="Создать категорию"
            style={{
              marginLeft: 16,
            }}
          />
          <LinkButton
            href="/admin/shop/item/new"
            color="primary"
            variant="contained"
            label="Создать продукт"
            style={{
              marginLeft: 16,
            }}
          />
        </Box>
        <AdminShopCategories />
        <AdminShopProducts />
      </Box>
    </AdminLayout>
  );
});

export default Shop;
