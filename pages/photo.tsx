import * as React from 'react';
import { Layout, BoxMain, PhotoLayout } from 'ui/index';
import { getPhotos } from 'core/operations';
import { PhotoData } from 'core/models';
import { GetServerSideProps } from 'next';

type Props = {
  data: PhotoData[];
};

const Photo = (props: Props) => {
  return (
    <Layout>
      <BoxMain>
        <PhotoLayout photos={props.data} />
      </BoxMain>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  let data = null;
  try {
    data = await getPhotos();
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

export default Photo;
