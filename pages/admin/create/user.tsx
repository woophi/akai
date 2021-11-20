import * as React from 'react';
import { AdminLayout, NewUser } from 'ui/index';
import { ensureAuthorizedForAdmin } from 'core/operations/auth';

class NewUserCC extends React.PureComponent {
  async componentDidMount() {
    try {
      await ensureAuthorizedForAdmin();
    } catch (e) {
      console.error('Error in Admin NewUser fetch', e);
    }
  }

  render() {
    return (
      <AdminLayout>
        <NewUser />
      </AdminLayout>
    );
  }
}

export default NewUserCC;
