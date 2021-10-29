import { getLanguage } from 'core/lib/lang';
import * as models from 'core/models';
import { getBio } from 'core/operations';
import { Request } from 'express';
import Head from 'next/head';
import * as React from 'react';
import { AboutLayout, BoxMain, Layout } from 'ui/index';
import NotFoundPage from './404';

type Props = {
  data: models.BioModel;
  notFound: boolean;
};

const About = (props: Props) => {
  const { data, notFound } = props;
  if (notFound) {
    return <NotFoundPage />;
  }
  return (
    <Layout title="About Akai Akaev">
      <Head>
        <meta property="og:title" content="About" />
        <meta property="og:description" content={data.content} />
        <meta property="og:image" content={data.photo} />
      </Head>
      <BoxMain>
        <AboutLayout content={data.content} photoUrl={data.photo} />
      </BoxMain>
    </Layout>
  );
};

About.getInitialProps = async ({ req }) => {
  let data = null;
  try {
    const lang = getLanguage(req as Request);
    data = await getBio(lang);
  } catch (error) {
    console.error(error);
  }

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    data,
  };
};

export default About;
