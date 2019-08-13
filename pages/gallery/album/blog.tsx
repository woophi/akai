import { withRouter } from 'next/router';
import { compose } from 'redux';
import * as React from 'react';
import { Layout, BoxMain, BlogLayout } from 'ui/index';
import { BlogModel } from 'core/models';
import { getBlogData } from 'core/operations';
import { i18next } from 'server/lib/i18n';
import { getCookie } from 'core/cookieManager';
import { WithRouterProps } from 'next/dist/client/with-router';
import { connectSocketBlog, joinRoom, leaveRoom } from 'core/socket/blog';
import Head from 'next/head';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { SITE_URL } = publicRuntimeConfig;
type Props = {
  blog: BlogModel;
} & WithRouterProps;

type LocalState = {
  blog: BlogModel;
};

class Blog extends React.PureComponent<Props, LocalState> {
  static async getInitialProps(context) {
    const blog = await getBlogData(
      String(context.query.id),
      'en'
    );
    return { blog };
  }
  state: LocalState = {
    blog: null
  };
  async componentDidMount() {
    try {
      connectSocketBlog();
      const currentLanguage = getCookie('akai_lng') || i18next.language;
      const blog = await getBlogData(
        String(this.props.router.query.id),
        currentLanguage
      );
      this.setState({ blog });
      joinRoom(String(this.props.router.query.id));
    } catch (e) {
      console.error('Error in Blog fetch', e);
    }
  }

  componentWillUnmount() {
    leaveRoom(String(this.props.router.query.id));
  }

  get imgContent() {
    const { blog } = this.props;
    return blog.socialShare && blog.socialShare.photo && blog.socialShare.photo.url
      ? blog.socialShare.photo.url
      : blog.photos[0].url;
  }

  render() {
    return (
      <>
        <Head>
          <meta
            property="og:url"
            content={`${SITE_URL}/gallery/album/${this.props.blog.id}`}
          />
          <meta property="og:type" content="article" />
          <meta property="og:title" content={this.props.blog.title} />
          <meta property="og:description" content={this.props.blog.topic} />
          <meta property="og:image" content={this.imgContent} />
        </Head>
        <Layout>
          <BoxMain>
            <BlogLayout blog={this.state.blog} />
          </BoxMain>
        </Layout>
      </>
    );
  }
}

export default compose(withRouter)(Blog);
