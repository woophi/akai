import * as React from 'react';
import { AdminLayout, AdminAlbumComponent } from 'ui/index';
import { ensureNotAuthorized } from 'core/operations/auth';

class NewAlbum extends React.PureComponent {
  async componentDidMount() {
    try {
      await ensureNotAuthorized();
    } catch (e) {
      console.error('Error in Admin NewAlbum fetch', e);
    }
  }

  render() {
    return (
      <AdminLayout>
        <AdminAlbumComponent />
      </AdminLayout>
    );
  }
}

export default NewAlbum;
