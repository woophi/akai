import { withRouter, WithRouterProps, } from 'next/router';
import { compose } from 'redux';
import * as React from 'react';
import { Layout, BoxMain, BlogLayout } from 'ui/index';
import { BlogModel } from 'core/models';
import { getBlogData } from 'core/operations';

type Props = {
  blog: BlogModel;
} & WithRouterProps;

class Blog extends React.PureComponent<Props> {
  static async getInitialProps(context) {
    try {
      // TODO: get from set language

      const blog = await getBlogData(context.query.id, 'en');
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
