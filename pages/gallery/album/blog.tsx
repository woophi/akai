import { withRouter, WithRouterProps, } from 'next/router';
import { compose } from 'redux';
import * as React from 'react';
import { Layout, BoxMain, BlogLayout } from 'ui/index';
import { BlogModel } from 'core/models';
import { getBlogData } from 'core/operations';
import { i18next } from 'server/lib/i18n';

type Props = {
  blog: BlogModel;
} & WithRouterProps;

class Blog extends React.PureComponent<Props> {
  static async getInitialProps({ req, query }) {
    try {
      const currentLanguage = req === null ? i18next.language : req.language;
      const blog = await getBlogData(query.id, currentLanguage);
      return { blog };
    } catch {
      return {
        blog: {}
      };
    }
  }

  render() {
    return (
      <Layout>
        <BoxMain>
          <BlogLayout blog={this.props.blog} />
        </BoxMain>
      </Layout>
    );
  }
}

export default compose(withRouter)(Blog);
