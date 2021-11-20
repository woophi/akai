import * as React from 'react';
import { ensureAuthorizedForAdmin } from 'core/operations/auth';
import { AdminLayout } from 'ui/index';
import { AdminBlogs } from 'ui/molecules/admin/blog/AdminBlog';

class Blogs extends React.PureComponent {
  async componentDidMount() {
    try {
      await ensureAuthorizedForAdmin();
    } catch (e) {
      console.error('Error in Admin Blogs fetch', e);
    }
  }

  render() {
    return (
      <AdminLayout>
        <AdminBlogs />
      </AdminLayout>
    );
  }
}

export default Blogs;
