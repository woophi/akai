import * as React from 'react';
import { Layout, BoxMain, VideoLayout } from 'ui/index';
class Youtube extends React.PureComponent {

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

export default Youtube;
