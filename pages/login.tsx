import * as React from 'react';
import { Layout, BoxMain, LoginLayout, Spinner } from 'ui/index';
import { checkAuthAndNavigate } from 'core/operations/auth';
import { connect as redux } from 'react-redux';
import { getUserFetching } from 'core/selectors';
import { AppState } from 'core/reducers/rootReducer';

type Props = {
  userFetching: boolean;
};

class Login extends React.PureComponent<Props> {
  componentDidMount() {
    checkAuthAndNavigate();
  }

  render() {
    return (
      <Layout>
        <BoxMain>
          <LoginLayout />
          <Spinner isShow={this.props.userFetching} />
        </BoxMain>
      </Layout>
    );
  }
}

export default redux((state: AppState) => ({
  userFetching: getUserFetching(state),
}))(Login);
