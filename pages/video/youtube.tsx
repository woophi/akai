import * as React from 'react';
import { Layout, BoxMain, YoutubeLayout } from 'ui/index';
class Youtube extends React.PureComponent {

  render() {
    return (
      <Layout>
        <BoxMain>
          <YoutubeLayout />
        </BoxMain>
      </Layout>
    );
  }
}

export default Youtube;
