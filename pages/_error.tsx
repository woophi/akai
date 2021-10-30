import * as React from 'react';
import { Layout, BoxMain, ErrorLayout } from 'ui/index';

type Props = {
  statusCode: number;
  err: any;
};

const Error = (props: Props) => {
  return (
    <Layout>
      <BoxMain>
        <ErrorLayout {...props} />
      </BoxMain>
    </Layout>
  );
};

Error.getInitialProps = ({ res, err }: any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : null;
  return { statusCode, err };
};

export default Error;
