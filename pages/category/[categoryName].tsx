import { getLanguage } from 'core/lib/lang';
import { CategoryData } from 'core/models';
import { getCategoryData } from 'core/operations';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import * as React from 'react';
import { CategoryLayout } from 'ui/cells/category-layout';
import { BoxMain, Layout } from 'ui/index';

type Props = {
  data: CategoryData;
};

const Category: React.FC<Props> = ({ data }) => {
  return (
    <Layout title={`Category ${data.name}`}>
      <Head>
        <meta property="og:title" content={`Category ${data.name}`} />
      </Head>
      <BoxMain>
        <CategoryLayout data={data} />
      </BoxMain>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  let data = null;
  const categoryName = String(query.categoryName);
  try {
    const lang = getLanguage(req);
    data = await getCategoryData(categoryName, lang);
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

export default Category;
