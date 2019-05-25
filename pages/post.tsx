import { withRouter, WithRouterProps } from 'next/router';
import { withStyles, Theme } from '@material-ui/core/styles';
import { compose } from 'redux';
import * as React from 'react';
import { callApi } from 'core/common';
import Head from 'next/head';
import getConfig from 'next/config';

const {publicRuntimeConfig} = getConfig();
const {SITE_URL} = publicRuntimeConfig;

const styles = (theme: Theme): any => ({
  root: {
    textAlign: 'center',
    paddingTop: '20px'
  }
});

type Props = {
  classes?: any,
  data?: any;
} & WithRouterProps;

class Page extends React.PureComponent<Props> {
  static async getInitialProps(context) {
    const data = await callApi<any>('get', `api/guest/blog?id=${context.query.id}`);

    return { data };
  }

  render() {
    const { data, router } = this.props;
    return (
      <>
        <Head>
          <meta property="og:url" content={`${SITE_URL}/p/${router.query.id}`} />
          <meta property="og:type" content="article" />
          <meta property="og:title" content={data.title} />
          <meta property="og:description" content={data.body} />
          <meta property="og:image" content={data.photos.url} />
        </Head>
        <div className={this.props.classes.root}>
          <h1>{this.props.router.query.title}</h1>
          <p>This is the blog post content.</p>
        </div>
      </>
    )
  }
}

export default compose(
  withRouter,
  withStyles(styles)
)(Page)
