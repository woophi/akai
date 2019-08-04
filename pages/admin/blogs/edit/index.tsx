import * as React from 'react';
import { AdminLayout, BlogForm, AdminBlogs } from 'ui/index';
import { ensureNotAuthorized } from 'core/operations/auth';
import { withRouter, WithRouterProps } from 'next/router';
import { BlogData } from 'core/models';
import { getBlogData } from 'ui/molecules/admin/blog/operations';

type localState = {
  blogData: BlogData;
};

class EditBlog extends React.PureComponent<WithRouterProps, localState> {
  state: localState = {
    blogData: undefined
  }
  async componentDidMount() {
    try {
      await ensureNotAuthorized();
      const blogData = await getBlogData(String(this.props.router.query.id));
      this.setState({ blogData });
    } catch (e) {
      console.error('Error in Admin EditBlog fetch', e);
    }
  }

  render() {
    return (
      <AdminLayout>
        <AdminBlogs withChildren>
          <BlogForm
            blogId={String(this.props.router.query.id)}
            initialValues={this.state.blogData}
          />
        </AdminBlogs>
      </AdminLayout>
    );
  }
}

export default withRouter(EditBlog);
