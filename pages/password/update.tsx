import * as React from 'react';
import { Layout, BoxMain, PassUpdateLayout } from 'ui/index';
import { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';

class UpdatePass extends React.PureComponent<WithRouterProps> {
  render() {
    return (
      <Layout>
        <BoxMain>
          <PassUpdateLayout linkId={String(this.props.router.query.id)} />
        </BoxMain>
      </Layout>
    );
  }
}

export default withRouter(UpdatePass);
