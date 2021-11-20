import { getUserFetching, isAdmin, isUserCustomer } from 'core/selectors';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { BoxMain, Layout, LoginLayout, Spinner } from 'ui/index';

const Login: React.FC = () => {
  const userFetching = useSelector(getUserFetching);
  const admin = useSelector(isUserCustomer);
  const customer = useSelector(isAdmin);
  const { replace } = useRouter();

  React.useEffect(() => {
    if (admin) {
      replace('/admin');
    } else if (customer) {
      replace('/me');
    }
  }, [admin, customer]);

  return (
    <Layout>
      <BoxMain>
        <LoginLayout />
        <Spinner isShow={userFetching} />
      </BoxMain>
    </Layout>
  );
};

export default Login;
