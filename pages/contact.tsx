import * as React from 'react';
import { Layout, BoxMain, ContactLayout } from 'ui/index';

class Contact extends React.PureComponent {

  render() {
    return (
      <Layout>
        <BoxMain>
          <ContactLayout />
        </BoxMain>
      </Layout>
    );
  }
}

export default Contact;
