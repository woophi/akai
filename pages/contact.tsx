import * as React from 'react';
import { Layout, BoxMain, ContactLayout } from 'ui/index';
import { connectUniqGuest } from 'core/socket/uniq-guest';

class Contact extends React.PureComponent {
  componentDidMount() {
    connectUniqGuest();
  }

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
