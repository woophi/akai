import * as React from 'react';
import { Layout, BoxMain, YoutubeLayout } from 'ui/index';
import { getYoutubes } from 'core/operations';
import { YoutubeItem } from 'core/models';

type Props = {
  yotubes: YoutubeItem[]
}

class Youtube extends React.PureComponent<Props> {
  static async getInitialProps() {
    const { yotubes } = await getYoutubes();

    return { yotubes };
  }

  render() {
    return (
      <Layout>
        <BoxMain>
          <YoutubeLayout items={this.props.yotubes} />
        </BoxMain>
      </Layout>
    );
  }
}

export default Youtube;
