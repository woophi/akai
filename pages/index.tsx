import * as React from 'react';
import { Layout, Carusel, BoxMain } from 'components/ui';
import { callApi } from 'core/common';
import * as models from 'core/models';
import Head from 'next/head';
import { GetServerSideProps } from 'next';

type Props = {
  data: models.SlideModel[];
};

const Home = (props: Props) => {
  return (
    <Layout>
      <Head>
        <meta property="og:title" content="Akai Akaev" />
        <meta property="og:image" content={props.data && props.data[0].src} />
      </Head>
      <BoxMain>
        <Carusel imgs={props.data} />
      </BoxMain>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  let data = null;
  try {
    data = await callApi<models.SlideModel[]>('get', 'api/guest/slides');
  } catch (error) {
    console.error(error);
  }

  return {
    props: { data },
  };
};

export default Home;
