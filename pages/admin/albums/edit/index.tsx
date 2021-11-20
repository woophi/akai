import * as React from 'react';
import { ensureAuthorizedForAdmin } from 'core/operations/auth';
import { AdminLayout, AdminAlbumComponent } from 'ui/index';
import { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';

class Album extends React.PureComponent<WithRouterProps> {
  async componentDidMount() {
    try {
      await ensureAuthorizedForAdmin();
    } catch (e) {
      console.error('Error in Admin Album edit fetch', e);
    }
  }

  render() {
    return (
      <AdminLayout>
        <AdminAlbumComponent albumId={this.props.router.query.id as string} />
      </AdminLayout>
    );
  }
}

export default withRouter(Album);
