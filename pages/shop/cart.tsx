import { BoxGrid } from 'ui/atoms';
import { Layout } from 'ui/molecules';
import { ShopBasket } from 'ui/molecules/shop-basket';

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
