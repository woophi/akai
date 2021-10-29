import { useRouter } from 'next/router';
import * as React from 'react';
import { BoxMain, Layout, UnsubLayout } from 'ui/index';

const UnsubGuest = () => {
  const { query } = useRouter();
  return (
    <Layout>
      <BoxMain>
        <UnsubLayout uniqId={String(query.id)} />
      </BoxMain>
    </Layout>
  );
};

export default UnsubGuest;
