import { BoxMain } from 'ui/atoms';
import { MeMainLayout } from 'ui/cells/me-layout';
import { Layout } from 'ui/molecules';

const Me = () => {
  return (
    <Layout title="Me">
      <BoxMain>
        <MeMainLayout />
      </BoxMain>
    </Layout>
  );
};

export default Me;
