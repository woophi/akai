import * as React from 'react';
import { Layout, BoxMain, AboutLayout } from 'ui/index';

class About extends React.PureComponent {

  render() {
    return (
      <Layout>
        <BoxMain>
          <AboutLayout />
        </BoxMain>
      </Layout>
    );
  }
}

export default About;
