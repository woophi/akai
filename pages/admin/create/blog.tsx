import * as React from 'react';
import { AdminLayout, BlogForm, AdminBlogs } from 'ui/index';
import { ensureNotAuthorized } from 'core/operations/auth';
import { AlbumModel } from 'core/models';
import { getAllAlbums } from 'core/operations';

type localState = {
  albums: AlbumModel[];
};

class NewBlog extends React.PureComponent<unknown, localState> {
  state: localState = {
    albums: []
  };
  async componentDidMount() {
    try {
      await ensureNotAuthorized();
      const albums = await getAllAlbums('ru');
      this.setState({ albums });
    } catch (e) {
      console.error('Error in Admin NewBlog fetch', e);
    }
  }

  render() {
    return (
      <AdminLayout>
        <AdminBlogs withChildren>
          <BlogForm albums={this.state.albums} />
        </AdminBlogs>
      </AdminLayout>
    );
  }
}

export default NewBlog;
