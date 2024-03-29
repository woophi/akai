import { getLanguage } from 'core/lib/lang';
import * as models from 'core/models';
import { getBio } from 'core/operations';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import * as React from 'react';
import { AboutLayout, BoxMain, Layout } from 'ui/index';

type Props = {
  data: models.BioModel;
};

const About = (props: Props) => {
  const { data } = props;
  return (
    <Layout title="About">
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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  let data = null;
  try {
    const lang = getLanguage(req);
    data = await getBio(lang);
  } catch {}

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data },
  };
};

export default About;
