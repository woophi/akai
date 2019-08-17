import * as React from 'react';
import { AdminLayout, NewUser } from 'ui/index';
import { ensureNotAuthorized } from 'core/operations/auth';

class NewUserCC extends React.PureComponent {
  async componentDidMount() {
    try {
      await ensureNotAuthorized();
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
