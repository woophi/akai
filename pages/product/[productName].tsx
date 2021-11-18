import { getLanguage } from 'core/lib/lang';
import { ProductData } from 'core/models';
import { getProductData } from 'core/operations';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import * as React from 'react';
import { ProductLayout } from 'ui/cells/product-layout';
import { BoxMain, Layout } from 'ui/index';

type Props = {
  data: ProductData;
};

const Product: React.FC<Props> = ({ data }) => {
  return (
    <Layout title={data.title}>
      <Head>
        <meta property="og:title" content={data.title} />
        <meta property="og:description" content={data.description} />
        {data.files[0]?.url && <meta property="og:image" content={data.files[0].url} />}
      </Head>
      <BoxMain>
        <ProductLayout data={data} />
      </BoxMain>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  let data = null;
  const productName = String(query.productName);
  try {
    const lang = getLanguage(req);
    data = await getProductData(productName, lang);
  } catch (error) {
    console.error(error);
  }

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data },
  };
};

export default Product;
