import * as React from 'react';
import { AdminLayout, AdminInstagram } from 'ui/index';
import { ensureAuthorizedForAdmin } from 'core/operations/auth';

class Instagram extends React.PureComponent {
  async componentDidMount() {
    try {
      await ensureAuthorizedForAdmin();
    } catch (e) {
      console.error('Error in Instagram fetch', e);
    }
  }

  render() {
    return (
      <AdminLayout>
        <AdminInstagram />
      </AdminLayout>
    );
  }
}

export default Instagram;
