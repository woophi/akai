import { withRouter, WithRouterProps } from 'next/router';
import { compose } from 'redux';
import * as React from 'react';
import { Layout, BoxMain, AlbumLayout } from 'ui/index';
import { BlogPreviewItem } from 'core/models';
import { getAlbumData } from 'core/operations';
import { i18next } from 'server/lib/i18n';
import { getCookie } from 'core/cookieManager';

type Props =  WithRouterProps;

type LocalState = {
  blogs: BlogPreviewItem[];
  albumTitle: string;
}

class Album extends React.PureComponent<Props, LocalState> {
  state: LocalState = {
    blogs: [],
    albumTitle: ''
  }
  async componentDidMount() {
    try {
      const currentLanguage = getCookie('akai_lng') || i18next.language;
      const data = await getAlbumData(String(this.props.router.query.id), currentLanguage);
      this.setState({ blogs: data.blogs, albumTitle: data.albumTitle });
    } catch (e) {
      console.error('Error in Album fetch', e);
    }
  }

  render() {
    return (
      <Layout>
        <BoxMain>
          <AlbumLayout albumTitle={this.state.albumTitle} blogs={this.state.blogs} />
        </BoxMain>
      </Layout>
    );
  }
}

export default compose(withRouter)(Album);
