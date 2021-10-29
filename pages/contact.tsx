import * as React from 'react';
import { Layout, BoxMain, ContactLayout } from 'ui/index';

class Contact extends React.PureComponent {
  render() {
    return (
      <Layout title="Contact - Akai Akaev">
        <BoxMain>
          <ContactLayout />
        </BoxMain>
      </Layout>
    );
  }
}

export default Contact;
