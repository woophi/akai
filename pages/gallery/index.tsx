import * as React from 'react';
import { Layout, BoxMain, GalleryLayout } from 'ui/index';
import { AlbumModel } from 'core/models';
import { getAllAlbums } from 'core/operations';
import { i18next } from 'server/lib/i18n';
import { getCookie } from 'core/cookieManager';

type LocalState = {
  albums: AlbumModel[];
};

class Gallery extends React.PureComponent<unknown, LocalState> {
  state: LocalState = {
    albums: [],
  };
  async componentDidMount() {
    try {
      const currentLanguage = getCookie('akai_lng') || i18next.language;
      const albums = await getAllAlbums(currentLanguage);
      this.setState({ albums });
    } catch (e) {
      console.error('Error in Gallery fetch', e);
    }
  }
  render() {
    return (
      <Layout>
        <BoxMain>
          <GalleryLayout albums={this.state.albums} />
        </BoxMain>
      </Layout>
    );
  }
}

export default Gallery;
