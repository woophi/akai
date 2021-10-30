import { getLanguage } from 'core/lib/lang';
import { AlbumModel } from 'core/models';
import { getAllAlbums } from 'core/operations';
import { Request } from 'express';
import { GetServerSideProps } from 'next';
import * as React from 'react';
import { BoxMain, GalleryLayout, Layout } from 'ui/index';

type Props = {
  albums: AlbumModel[];
};

const Gallery = (props: Props) => {
  return (
    <Layout>
      <BoxMain>
        <GalleryLayout albums={props.albums} />
      </BoxMain>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  let albums = null;
  try {
    const lang = getLanguage(req as Request);
    albums = await getAllAlbums(lang);
  } catch (error) {
    console.error(error);
  }

  if (!albums) {
    return {
      notFound: true,
    };
  }

  return {
    props: { albums },
  };
};

export default Gallery;
