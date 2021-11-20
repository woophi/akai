import * as React from 'react';
import { AdminLayout, AdminYoutube } from 'ui/index';
import { ensureAuthorizedForAdmin } from 'core/operations/auth';

class Youtube extends React.PureComponent {
  async componentDidMount() {
    try {
      await ensureAuthorizedForAdmin();
    } catch (e) {
      console.error('Error in Youtube fetch', e);
    }
  }

  render() {
    return (
      <AdminLayout>
        <AdminYoutube />
      </AdminLayout>
    );
  }
}

export default Youtube;
