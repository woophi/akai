import * as React from 'react';
import { Layout, BoxMain, GalleryLayout } from 'ui/index';
import { AlbumModel } from 'core/models';
import { getAllAlbums } from 'core/operations';
import { i18next } from 'server/lib/i18n';

type Props = {
  albums: AlbumModel[]
}

class Gallery extends React.PureComponent<Props> {
  static async getInitialProps({ req }) {
    try {
      const currentLanguage = req === null ? i18next.language : req.language;
      const albums = await getAllAlbums(currentLanguage);
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
