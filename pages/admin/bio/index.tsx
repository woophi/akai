import * as React from 'react';
import { AdminLayout, AdminBio } from 'ui/index';
import { ensureAuthorizedForAdmin } from 'core/operations/auth';

class Bio extends React.PureComponent {
  async componentDidMount() {
    try {
      await ensureAuthorizedForAdmin();
    } catch (e) {
      console.error('Error in Admin Bio fetch', e);
    }
  }

  render() {
    return (
      <AdminLayout>
        <AdminBio />
      </AdminLayout>
    );
  }
}

export default Bio;
