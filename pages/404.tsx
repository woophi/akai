import { FC } from 'react';
import { BoxMain } from 'ui/atoms';
import { ErrorLayout } from 'ui/cells';
import { Layout } from 'ui/molecules';

export const NotFoundPage: FC = () => {
  return (
    <Layout>
      <BoxMain>
        <ErrorLayout statusCode={404} err={'Nothing Here'} />
      </BoxMain>
    </Layout>
  );
};
export default NotFoundPage;
