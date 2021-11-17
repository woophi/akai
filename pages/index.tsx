import * as React from 'react';
import { Layout, Carusel, BoxMain } from 'components/ui';
import { callApi } from 'core/common';
import * as models from 'core/models';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { getLanguage } from 'core/lib/lang';

type Props = {
  data: models.SlideModel[];
};

const Home = (props: Props) => {
  return (
    <Layout>
      <Head>
        <meta property="og:title" content="Akai Akaev" />
        {props.data.length && <meta property="og:image" content={props.data[0].src} />}
      </Head>
      <BoxMain>
        <Carusel slides={props.data} />
      </BoxMain>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  let data: models.SlideModel[] = [];
  try {
    const lang = getLanguage(req);
    data = await callApi<models.SlideModel[]>('get', `api/guest/slides?localeId=${lang}`);
  } catch (error) {
    console.error(error);
  }

  return {
    props: { data },
  };
};

export default Home;
