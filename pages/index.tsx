import * as React from 'react';
import { Layout, Carusel, BoxMain, BoxGrid } from 'components/ui';
import { callApi } from 'core/common';
import * as models from 'core/models';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { getLanguage } from 'core/lib/lang';
import { ProductHomeLayout } from 'ui/cells/product-layout';
import { getShopRelatedData } from 'core/operations';

type Props = {
  data: models.SlideModel[];
  shopData: models.ShopRelatedData | null;
};

const Home = (props: Props) => {
  return (
    <Layout hideSub={!!props.shopData?.products.length}>
      <Head>
        <meta property="og:title" content="Akai Akaev" />
        {props.data.length && <meta property="og:image" content={props.data[0].src} />}
      </Head>
      <BoxMain>
        <Carusel slides={props.data} />
      </BoxMain>
      {props.shopData?.products.length ? <ProductHomeLayout shopData={props.shopData} /> : null}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  let data: models.SlideModel[] = [];
  let shopData: models.ShopRelatedData | null = null;
  try {
    const lang = getLanguage(req);
    data = await callApi<models.SlideModel[]>('get', `api/guest/slides?localeId=${lang}`);
    shopData = await getShopRelatedData(lang);
  } catch (error) {
    console.error(error);
  }

  return {
    props: { data, shopData },
  };
};

export default Home;
