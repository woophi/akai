import * as React from 'react';
import { withStyles, Theme } from '@material-ui/core/styles';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Layout, Carusel } from 'components/ui';
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
  data: models.SlideModel[];
} & WithTranslation;

class Index extends React.Component<Props> {
  static async getInitialProps() {
    const data = await callApi<models.SlideModel[]>('get', 'api/guest/slides');
    return { data };
  }

  render() {
    const { data } = this.props;
    console.warn('JA EBAL ',data);
    return (
      <Layout>
        <Carusel imgs={data || []} />
      </Layout>
    );
  }
}

export default withTranslation(['common'])(withStyles(styles)(Index));
