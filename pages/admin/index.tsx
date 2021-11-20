import * as React from 'react';
import { ensureAuthorizedForAdmin } from 'core/operations/auth';
import { AdminLayout, AdminDashboard } from 'ui/index';

class Admin extends React.PureComponent {
  async componentDidMount() {
    try {
      await ensureAuthorizedForAdmin();
    } catch (e) {
      console.error('Error in Admin fetch', e);
    }
  }

  render() {
    return (
      <AdminLayout>
        <AdminDashboard />
      </AdminLayout>
    );
  }
}

export default Admin;
