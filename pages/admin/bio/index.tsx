import * as React from 'react';
import { AdminLayout, AdminBio } from 'ui/index';
import { ensureNotAuthorized } from 'core/operations/auth';

class Bio extends React.PureComponent {
  async componentDidMount() {
    try {
      await ensureNotAuthorized();
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
