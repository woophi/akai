import { Box, Button, Typography, useMediaQuery } from '@material-ui/core';
import { ShopData } from 'core/models';
import { loadShopItems } from 'core/operations';
import React from 'react';
import { useTranslation } from 'server/lib/i18n';
import { BoxGrid } from 'ui/atoms';
import { CategoryButtonsColumn } from '../product-layout/CategoryButtons';
import { RecentlyAddedProduct } from '../product-layout/RecentlyAddedProduct';
import { RecentlyViewedProducts } from '../product-layout/RecentlyViewedProducts';

export const INCREASE_ITEMS_OFFSET = 100;

export const ShopLayout = React.memo<{ data: ShopData }>(({ data }) => {
  const { t } = useTranslation('common');
  const isSmallEnough = useMediaQuery('(max-width:800px)');
  const [products, setProducts] = React.useState(data.products);
  const [offset, setOffset] = React.useState(0);
  const [fetching, setFetching] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);

  const loadMore = React.useCallback(() => {
    setFetching(true);
    const newOffset = offset + INCREASE_ITEMS_OFFSET;
    loadShopItems(data.locale, newOffset)
      .then(newProducts => {
        if (!!newProducts.length) {
          setProducts(v => v.concat(newProducts));
          return true;
        }
        return false;
      })
      .then(r => (r ? setOffset(newOffset) : setHidden(true)))
      .finally(() => setFetching(false));
  }, [offset, data.locale]);

  const hasMore = products.length && products.length - offset === INCREASE_ITEMS_OFFSET;

  return (
    <BoxGrid>
      <Box width="65%" minWidth="320px" marginBottom="1rem">
        <Typography variant="h3">{t('shop.allArts')}</Typography>

        <Box
          display="grid"
          gridTemplateColumns={isSmallEnough ? '1fr' : '1fr 1fr 1fr'}
          gridTemplateRows={isSmallEnough ? '1fr 1fr 1fr' : undefined}
          style={{ gap: '1rem' }}
          marginBottom="3rem"
        >
          {products.map(p => (
            <RecentlyAddedProduct key={p.id} data={p} />
          ))}
        </Box>
        <Box display="flex" width="100%" justifyContent="center" flexDirection="column">
          {hasMore && !hidden ? (
            <Button
              color="primary"
              onClick={loadMore}
              size="large"
              style={{
                height: 120,
              }}
            >
              {fetching ? t('buttons.loading') : t('buttons:loadMore')}
            </Button>
          ) : null}
        </Box>
      </Box>
      <Box width="30%" minWidth="320px">
        <RecentlyAddedProduct data={data.recentlyAddedProduct} />
        <RecentlyViewedProducts />
        <CategoryButtonsColumn categories={data.categories} />
      </Box>
    </BoxGrid>
  );
});
