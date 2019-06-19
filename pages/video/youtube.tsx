import * as React from 'react';
import { Layout, BoxMain, YoutubeLayout } from 'ui/index';
import { getYoutubes } from 'core/operations';
import { YoutubeItem } from 'core/models';

type LocalState = {
  youtubes: YoutubeItem[];
};

class Youtube extends React.PureComponent<unknown, LocalState> {
  state: LocalState = {
    youtubes: []
  }

  async componentDidMount() {
    try {
      const youtubes = await getYoutubes();
      this.setState({ youtubes });
    } catch (e) {
      console.error('Error in youtubes', e);
    }
  }

  render() {
    return (
      <Layout>
        <BoxMain>
          <YoutubeLayout items={this.state.youtubes} />
        </BoxMain>
      </Layout>
    );
  }
}

export default Youtube;
