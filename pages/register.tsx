import * as React from 'react';
import { RegisterLayout } from 'ui/cells/register-lyout';
import { BoxMain, Layout } from 'ui/index';

const Register: React.FC = () => {
  return (
    <Layout>
      <BoxMain>
        <RegisterLayout />
      </BoxMain>
    </Layout>
  );
};

export default Register;
