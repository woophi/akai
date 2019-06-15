import * as React from 'react';
import { Layout, BoxMain, OnlineLayout } from 'ui/index';
class Online extends React.PureComponent {

  render() {
    return (
      <Layout>
        <BoxMain>
          <OnlineLayout />
        </BoxMain>
      </Layout>
    );
  }
}

export default Online;
