import { BoxGrid } from 'ui/atoms';
import { Layout } from 'ui/molecules';
import dynamic from 'next/dynamic';
import { Skeleton } from '@material-ui/lab';
import { Box } from '@material-ui/core';

const BigSkelleton = () => (
  <Box display="flex" flexDirection="column" flex={1}>
    <Box margin="1rem">
      <Skeleton variant="rect" height={118} animation="wave" />
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
    </Box>
    <Box margin="1rem">
      <Skeleton variant="rect" height={118} animation="wave" />
      <Skeleton animation="wave" />
    </Box>
    <Box margin="1rem">
      <Skeleton animation="wave" />
      <Skeleton variant="rect" height={118} animation="wave" />
    </Box>
  </Box>
);

const ShopBasket = dynamic(() => import('ui/molecules/shop-basket'), { ssr: false, loading: BigSkelleton });

const ShopCart = () => {
  return (
    <Layout title="Cart">
      <BoxGrid>
        <ShopBasket />
      </BoxGrid>
    </Layout>
  );
};

export default ShopCart;
