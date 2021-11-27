import { ensureAuthorizedForAdmin } from 'core/operations/auth';
import * as React from 'react';
import { AdminLayout } from 'ui/index';
import { AdminTermsConditions } from 'ui/molecules/admin/term-and-conditions';

const TermsConditions: React.FC = () => {
  React.useEffect(() => {
    ensureAuthorizedForAdmin();
  }, []);

  return (
    <AdminLayout>
      <AdminTermsConditions />
    </AdminLayout>
  );
};

export default TermsConditions;
