import { ensureAuthorizedForUser } from 'core/operations/auth';
import { useEffect } from 'react';
import { BoxMain } from 'ui/atoms';
import { MeMainLayout } from 'ui/cells/me-layout';
import { Layout } from 'ui/molecules';

const Me = () => {
  useEffect(() => {
    ensureAuthorizedForUser();
  }, []);

  return (
    <Layout title="Me">
      <BoxMain>
        <MeMainLayout />
      </BoxMain>
    </Layout>
  );
};

export default Me;
