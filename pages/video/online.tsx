import * as React from 'react';
import { Layout, BoxMain, VideoLayout } from 'ui/index';
class Online extends React.PureComponent {

  render() {
    return (
      <Layout>
        <BoxMain>
          <VideoLayout />
        </BoxMain>
      </Layout>
    );
  }
}

export default Online;
