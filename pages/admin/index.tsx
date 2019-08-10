import * as React from 'react';
import { ensureNotAuthorized } from 'core/operations/auth';
import { AdminLayout } from 'ui/index';
import Box from '@material-ui/core/Box';

class Admin extends React.PureComponent {
  async componentDidMount() {
    try {
      await ensureNotAuthorized();
    } catch (e) {
      console.error('Error in Admin fetch', e);
    }
  }

  render() {
    return (
      <AdminLayout>
        <Box flexDirection="column" flex={1}>
          {'Hello'}
        </Box>
      </AdminLayout>
    );
  }
}

export default Admin;
