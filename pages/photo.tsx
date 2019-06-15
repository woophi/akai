import * as React from 'react';
import { Layout, BoxMain, PhotoLayout } from 'ui/index';
import { getPhotos } from 'core/operations';
import { PhotoData } from 'core/models';

type Props = {
  photos: PhotoData[]
}

class Photo extends React.PureComponent<Props> {

  static async getInitialProps() {
    const photos = await getPhotos();
    return { photos };
  }

  render() {
    return (
      <Layout>
        <BoxMain>
          <PhotoLayout photos={this.props.photos} />
        </BoxMain>
      </Layout>
    );
  }
}

export default Photo;
