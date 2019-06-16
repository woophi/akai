import * as React from 'react';
import { Layout, BoxMain, GalleryLayout } from 'ui/index';
import { AlbumModel } from 'core/models';
import { getAllAlbums } from 'core/operations';

type Props = {
  albums: AlbumModel[]
}

class Gallery extends React.PureComponent<Props> {
  static async getInitialProps() {
    try {
      // TODO: get from set language
      const albums = await getAllAlbums('en');
      return { albums };

    } catch (_) {
      return { albums: [] }
    }
  }
  render() {
    return (
      <Layout>
        <BoxMain>
          <GalleryLayout albums={this.props.albums} />
        </BoxMain>
      </Layout>
    );
  }
}

export default Gallery;
