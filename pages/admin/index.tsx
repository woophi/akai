import * as React from 'react';
import { ensureNotAuthorized } from 'core/operations/auth';
import { AdminLayout, Block } from 'ui/index';
import { AlbumModel } from 'core/models';
import { getCookie } from 'core/cookieManager';
import { getAllAlbums } from 'core/operations';
import { i18next } from 'server/lib/i18n';

type LocalState = {
  albums: AlbumModel[]
}

class Admin extends React.PureComponent<unknown, LocalState> {

  state: LocalState = {
    albums: []
  }
  async componentDidMount() {
    try {
      await ensureNotAuthorized();
      const currentLanguage = getCookie('akai_lng') || i18next.language;
      const albums = await getAllAlbums(currentLanguage);
      this.setState({ albums });
    } catch (e) {
      console.error('Error in Gallery fetch', e);
    }
  }

  render() {
    return (
      <AdminLayout>
        {this.state.albums.map((a, i) => (
          <Block
            key={i}
            title={a.title}
            imgSrc={a.coverPhoto}
            subTitle={'изменить'}
            href={`album/${a.id}`}
          />
        ))}
      </AdminLayout>
    );
  }
}

export default Admin;