import * as React from 'react';
import { AdminLayout, AdminFacebook } from 'ui/index';
import { ensureNotAuthorized } from 'core/operations/auth';

class Facebook extends React.PureComponent {

  async componentDidMount() {
    try {
      await ensureNotAuthorized();
    } catch (e) {
      console.error('Error in Facebook fetch', e);
    }
  }

  render() {
    return (
      <AdminLayout>
        <AdminFacebook />
      </AdminLayout>
    );
  }
}

export default Facebook;
