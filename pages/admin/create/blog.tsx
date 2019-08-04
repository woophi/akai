import * as React from 'react';
import { AdminLayout, BlogForm, AdminBlogs } from 'ui/index';
import { ensureNotAuthorized } from 'core/operations/auth';

class NewBlog extends React.PureComponent {
  async componentDidMount() {
    try {
      await ensureNotAuthorized();
    } catch (e) {
      console.error('Error in Admin NewBlog fetch', e);
    }
  }

  render() {
    return (
      <AdminLayout>
        <AdminBlogs withChildren>
          <BlogForm />
        </AdminBlogs>
      </AdminLayout>
    );
  }
}

export default NewBlog;
