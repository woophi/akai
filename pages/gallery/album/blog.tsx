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

type Props = WithRouterProps;

type LocalState = {
  blog: BlogModel;
}

class Blog extends React.PureComponent<Props, LocalState> {

  state: LocalState = {
    blog: null
  }
  async componentDidMount() {
    try {
      connectSocketBlog();
      const currentLanguage = getCookie('akai_lng') || i18next.language;
      const blog = await getBlogData(String(this.props.router.query.id), currentLanguage);
      this.setState({ blog });
      joinRoom(String(this.props.router.query.id));
    } catch (e) {
      console.error('Error in Blog fetch', e);
    }
  }

  componentWillUnmount() {
    leaveRoom(String(this.props.router.query.id));
  }

  render() {
    return (
      <Layout>
        <BoxMain>
          <BlogLayout blog={this.state.blog} />
        </BoxMain>
      </Layout>
    );
  }
}

export default compose(withRouter)(Blog);
