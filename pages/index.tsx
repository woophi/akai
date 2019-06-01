import * as React from 'react';
import { Layout, Carusel, Subscribe, BoxMain, Footer } from 'components/ui';
import { callApi } from 'core/common';
import * as models from 'core/models';
import { subscribe } from 'core/operations';

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
        <Subscribe onSubscribe={subscribe} />
        <Footer />
      </Layout>
    );
  }
}

export default Index;
