import * as React from 'react';
import { ensureNotAuthorized } from 'core/operations/auth';
import { AdminLayout, AdminUsers } from 'ui/index';

class Users extends React.PureComponent {
  async componentDidMount() {
    try {
      await ensureNotAuthorized();
    } catch (e) {
      console.error('Error in Admin Users fetch', e);
    }
  }

  render() {
    return (
      <AdminLayout>
        <AdminUsers />
      </AdminLayout>
    );
  }
}

export default Users;
