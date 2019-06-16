import { withRouter, WithRouterProps } from 'next/router';
import { compose } from 'redux';
import * as React from 'react';
import { Layout, BoxMain, AlbumLayout } from 'ui/index';
import { BlogPreviewItem } from 'core/models';
import { getAlbumData } from 'core/operations';

type Props = {
  blogs: BlogPreviewItem[];
  albumTitle: string;
} & WithRouterProps;

class Album extends React.PureComponent<Props> {
  static async getInitialProps(context) {
    try {
      // TODO: get from set language

      const data = await getAlbumData(context.query.id, 'en');
      return { ...data };
    } catch {
      return {
        blogs: [],
        albumTitle: ''
      };
    }
  }

  render() {
    return (
      <Layout>
        <BoxMain>
          <AlbumLayout albumTitle={this.props.albumTitle} blogs={this.props.blogs} />
        </BoxMain>
      </Layout>
    );
  }
}

export default compose(withRouter)(Album);
