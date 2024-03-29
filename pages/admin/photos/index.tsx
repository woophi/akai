import * as React from 'react';
import { AdminLayout, AdminPhotos } from 'ui/index';
import { ensureAuthorizedForAdmin } from 'core/operations/auth';

class Photos extends React.PureComponent {
  async componentDidMount() {
    try {
      await ensureAuthorizedForAdmin();
    } catch (e) {
      console.error('Error in Admin Photos fetch', e);
    }
  }

  render() {
    return (
      <AdminLayout>
        <AdminPhotos />
      </AdminLayout>
    );
  }
}

export default Photos;
