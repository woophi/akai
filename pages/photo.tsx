import * as React from 'react';
import { Layout, BoxMain, PhotoLayout } from 'ui/index';
import { getPhotos } from 'core/operations';
import { PhotoData } from 'core/models';

type LocalState = {
  photos: PhotoData[]
}

class Photo extends React.PureComponent<unknown, LocalState> {
  state: LocalState = {
    photos: []
  }

  async componentDidMount() {
    try {
      const photos = await getPhotos();
      this.setState({ photos });
    } catch (e) {
      console.error('Failed to fetch photos', e);
    }
  }

  render() {
    return (
      <Layout>
        <BoxMain>
          <PhotoLayout photos={this.state.photos} />
        </BoxMain>
      </Layout>
    );
  }
}

export default Photo;
