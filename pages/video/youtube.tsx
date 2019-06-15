import * as React from 'react';
import { Layout, BoxMain, YoutubeLayout } from 'ui/index';
import { getYoutubes } from 'core/operations';
import { YoutubeItem } from 'core/models';

type Props = {
  youtubes: YoutubeItem[]
}

class Youtube extends React.PureComponent<Props> {
  static async getInitialProps() {
    const youtubes = await getYoutubes();
    return { youtubes };
  }

  render() {
    return (
      <Layout>
        <BoxMain>
          <YoutubeLayout items={this.props.youtubes} />
        </BoxMain>
      </Layout>
    );
  }
}

export default Youtube;
