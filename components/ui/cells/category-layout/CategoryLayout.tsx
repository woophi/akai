import { Box, Typography, useMediaQuery } from '@material-ui/core';
import { CategoryData } from 'core/models';
import React from 'react';
import { BoxGrid } from 'ui/atoms';
import { RecentlyAddedProduct } from '../product-layout/RecentlyAddedProduct';
import { RecentlyViewedProducts } from '../product-layout/RecentlyViewedProducts';

export const CategoryLayout = React.memo<{ data: CategoryData }>(({ data }) => {
  const isSmallEnough = useMediaQuery('(max-width:800px)');

  return (
    <BoxGrid>
      <Box width="65%" minWidth="320px" marginBottom="1rem">
        <Typography variant="h5" gutterBottom>
          {data.name}
        </Typography>
        <Box
          display="grid"
          gridTemplateColumns={isSmallEnough ? '1fr' : '1fr 1fr 1fr'}
          gridTemplateRows={isSmallEnough ? '1fr 1fr 1fr' : undefined}
          style={{ gap: '1rem' }}
        >
          {data.products.map(p => (
            <RecentlyAddedProduct key={p.id} data={p} />
          ))}
        </Box>
      </Box>
      <Box width="30%" minWidth="320px">
        <RecentlyAddedProduct data={data.recentlyAddedProduct} />
        <RecentlyViewedProducts />
      </Box>
    </BoxGrid>
  );
});
