import * as React from 'react';
import { Layout, BoxMain, UnsubLayout } from 'ui/index';
import { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';

class UnsubGuest extends React.PureComponent<WithRouterProps> {

  render() {
    return (
      <Layout>
        <BoxMain>
          <UnsubLayout uniqId={String(this.props.router.query.id)} />
        </BoxMain>
      </Layout>
    );
  }
}

export default withRouter(UnsubGuest);
