import * as React from 'react';
import { Layout, BoxMain, UnsubLayout } from 'ui/index';
import { WithRouterProps, withRouter } from 'next/router';

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
