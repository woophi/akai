import * as React from 'react';
import { withStyles, Theme } from '@material-ui/core/styles';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Layout, Carusel, Subscribe } from 'components/ui';
import { callApi } from 'core/common';
import * as models from 'core/models';

const styles = (theme: Theme): any => ({
  root: {
    textAlign: 'center',
    paddingTop: '20px'
  },
  block: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  m3: {
    margin: '16px auto'
  }
});

type Props = {
  classes: any;
} & WithTranslation;

type LocalState = {
  data: models.SlideModel[];
}

class Index extends React.Component<Props, LocalState> {
  state: LocalState = {
    data: []
  }
  async componentDidMount() {
    const data = await callApi<models.SlideModel[]>('get', 'api/guest/slides');
    this.setState({ data })
  }
  render() {
    return (
      <Layout>
        <div style={{height: '100vh'}}>
          <Carusel imgs={this.state.data} />
        </div>
        <Subscribe />
      </Layout>
    );
  }
}

export default withTranslation(['common'])(withStyles(styles)(Index));
