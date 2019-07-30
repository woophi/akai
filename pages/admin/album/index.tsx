import * as React from 'react';
import { ensureNotAuthorized } from 'core/operations/auth';
import { AdminLayout, AdminAlbumComponent } from 'ui/index';
import { withRouter, WithRouterProps } from 'next/router';

class Album extends React.PureComponent<WithRouterProps> {
  async componentDidMount() {
    try {
      await ensureNotAuthorized();
    } catch (e) {
      console.error('Error in Admin Album fetch', e);
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
