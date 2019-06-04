import * as React from 'react';
import { Layout, Carusel, BoxMain } from 'components/ui';
import { callApi } from 'core/common';
import * as models from 'core/models';

type LocalState = {
  data: models.SlideModel[];
}

class Index extends React.Component<unknown, LocalState> {
  state: LocalState = {
    data: []
  }
  componentDidMount() {
    callApi<models.SlideModel[]>('get', 'api/guest/slides')
      .then(data => this.setState({ data }));

  }
  render() {
    return (
      <Layout>
        <BoxMain>
          <Carusel imgs={this.state.data} />
        </BoxMain>
      </Layout>
    );
  }
}

export default Index;
