import * as React from 'react';
import { Layout, BoxMain, PassUpdateLayout } from 'ui/index';
import { WithRouterProps, withRouter } from 'next/router';

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
