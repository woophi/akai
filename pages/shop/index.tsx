import { getLanguage } from 'core/lib/lang';
import { ShopData } from 'core/models';
import { getShopData } from 'core/operations';
import { GetServerSideProps } from 'next';
import { BoxMain } from 'ui/atoms';
import { ShopLayout } from 'ui/cells/shop-layout';
import { Layout } from 'ui/molecules';

const Shop = ({ data }: { data: ShopData }) => {
  return (
    <Layout title="Store of artworks">
      <BoxMain>
        <ShopLayout data={data} />
      </BoxMain>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  let data: ShopData | null = null;
  try {
    const lang = getLanguage(req);
    data = await getShopData(lang);
  } catch {}

  return {
    props: { data },
  };
};

export default Shop;
