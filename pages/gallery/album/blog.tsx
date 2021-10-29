import { getLanguage } from 'core/lib/lang';
import { BlogModel } from 'core/models';
import { getBlogData } from 'core/operations';
import { connectSocketBlog, joinRoom, leaveRoom } from 'core/socket/blog';
import { Request } from 'express';
import { GetServerSideProps } from 'next';
import getConfig from 'next/config';
import Head from 'next/head';
import isEmpty from 'ramda/src/isEmpty';
import * as React from 'react';
import { BlogLayout, BoxMain, Layout } from 'ui/index';

const { publicRuntimeConfig } = getConfig();
const { SITE_URL } = publicRuntimeConfig;

const Blog = ({ blog }: { blog: BlogModel }) => {
  React.useEffect(() => {
    if (blog) {
      connectSocketBlog();
      joinRoom(blog.id);
    }

    return () => {
      if (blog) leaveRoom(blog.id);
    };
  }, []);

  const imgContent = React.useMemo(() => {
    if (isEmpty(blog)) {
      return '';
    }
    return blog.socialShare && blog.socialShare.photo && blog.socialShare.photo.url
      ? blog.socialShare.photo.url
      : blog.photos[0].url;
  }, []);

  if (isEmpty(blog)) {
    return null;
  }
  return (
    <>
      <Head>
        <meta property="og:url" content={`${SITE_URL}/gallery/album/${blog.id}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.topic} />
        <meta property="og:image" content={imgContent} />
      </Head>
      <Layout>
        <BoxMain>
          <BlogLayout blog={blog} />
        </BoxMain>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  let blog = null;
  try {
    const lang = getLanguage(req as Request);
    blog = await getBlogData(String(query.id), lang);
  } catch (error) {
    console.error(error);
  }

  if (!blog) {
    return {
      notFound: true,
    };
  }

  return {
    props: { blog },
  };
};

export default Blog;
