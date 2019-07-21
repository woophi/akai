import * as React from 'react';
import { ensureNotAuthorized } from 'core/operations/auth';
import { AdminLayout, Block } from 'ui/index';
import { BlogPreviewItem } from 'core/models';
import { getCookie } from 'core/cookieManager';
import { getAlbumData } from 'core/operations';
import { i18next } from 'server/lib/i18n';
import { withRouter, WithRouterProps } from 'next/router';

type LocalState = {
  blogs: BlogPreviewItem[];
}

class Album extends React.PureComponent<WithRouterProps, LocalState> {

  state: LocalState = {
    blogs: []
  }
  async componentDidMount() {
    try {
      await ensureNotAuthorized();
      const currentLanguage = getCookie('akai_lng') || i18next.language;
      const data = await getAlbumData(String(this.props.router.query.id), currentLanguage);
      this.setState({ blogs: data.blogs });
    } catch (e) {
      console.error('Error in Album fetch', e);
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
