import { Box } from '@material-ui/core';
import { ensureNotAuthorized } from 'core/operations/auth';
import * as React from 'react';
import { AdminLayout, LinkButton } from 'ui/index';
import { AdminShopCategories } from 'ui/molecules/admin/shop/AdminShopCategories';

const Shop = React.memo(() => {
  React.useEffect(() => {
    ensureNotAuthorized();
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
      </Box>
    </AdminLayout>
  );
});

export default Shop;
