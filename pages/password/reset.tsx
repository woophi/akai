import * as React from 'react';
import { Layout, BoxMain, PassResetLayout } from 'ui/index';

class PassReset extends React.PureComponent {

  render() {
    return (
      <Layout>
        <BoxMain>
          <PassResetLayout />
        </BoxMain>
      </Layout>
    );
  }
}

export default PassReset;
