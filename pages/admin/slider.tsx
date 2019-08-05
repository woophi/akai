import * as React from 'react';
import { AdminLayout, AdminSlider } from 'ui/index';
import { ensureNotAuthorized } from 'core/operations/auth';

class Slider extends React.PureComponent {
  async componentDidMount() {
    try {
      await ensureNotAuthorized();
    } catch (e) {
      console.error('Error in Admin Slider fetch', e);
    }
  }

  render() {
    return (
      <AdminLayout>
        <AdminSlider />
      </AdminLayout>
    );
  }
}

export default Slider;
