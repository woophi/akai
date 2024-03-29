import { getLanguage } from 'core/lib/lang';
import { BlogsModel } from 'core/models';
import { getAlbumData } from 'core/operations';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import * as React from 'react';
import { AlbumLayout, BoxMain, Layout } from 'ui/index';

const Album = (props: { data: BlogsModel }) => {
  return (
    <Layout title="Album">
      <Head>
        <meta property="og:title" content="Album" />
        <meta property="og:description" content={props.data.albumTitle} />
      </Head>
      <BoxMain>
        <AlbumLayout albumTitle={props.data.albumTitle} blogs={props.data.blogs} />
      </BoxMain>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  let data = null;
  try {
    const lang = getLanguage(req);
    data = await getAlbumData(String(query.id), lang);
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

export default Album;
