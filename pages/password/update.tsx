import { useRouter } from 'next/router';
import * as React from 'react';
import { BoxMain, Layout, PassUpdateLayout } from 'ui/index';

const UpdatePass = () => {
  const { query } = useRouter();
  return (
    <Layout>
      <BoxMain>
        <PassUpdateLayout linkId={String(query.id)} />
      </BoxMain>
    </Layout>
  );
};

export default UpdatePass;
