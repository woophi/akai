import * as React from 'react';
import { ensureNotAuthorized } from 'core/operations/auth';

class Admin extends React.PureComponent {

  componentDidMount() {
    ensureNotAuthorized()
  }

  render() {
    return (
      <div>
        admin here
      </div>
    );
  }
}

export default Admin;
