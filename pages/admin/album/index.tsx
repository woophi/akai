import * as React from 'react';
import { ensureNotAuthorized } from 'core/operations/auth';
import { AdminLayout, Block } from 'ui/index';
import { BlogPreviewItem } from 'core/models';
import { withRouter, WithRouterProps } from 'next/router';

type LocalState = {
  blogs: BlogPreviewItem[];
};

class Album extends React.PureComponent<WithRouterProps, LocalState> {
  state: LocalState = {
    blogs: []
  };
  async componentDidMount() {
    try {
      await ensureNotAuthorized();
    } catch (e) {
      console.error('Error in Admin Album fetch', e);
    }
  }

  render() {
    return (
      <AdminLayout>
        {this.state.blogs.map((a, i) => (
          <Block
            key={i}
            title={a.title}
            imgSrc={a.coverPhoto}
            subTitle={'изменить'}
            href={`blog/${a.id}`}
          />
        ))}
      </AdminLayout>
    );
  }
}

export default withRouter(Album);
