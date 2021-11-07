import { ensureNotAuthorized } from 'core/operations/auth';
import { useRouter } from 'next/router';
import * as React from 'react';
import { AdminEditUser, AdminLayout } from 'ui/index';
import { getUser } from 'ui/molecules/admin/users/operations';

const EditUser: React.FC = () => {
  const { query } = useRouter();
  const userId = String(query.userId);

  React.useEffect(() => {
    ensureNotAuthorized();
    getUser(userId);
  }, [userId]);
  return (
    <AdminLayout>
      <AdminEditUser />
    </AdminLayout>
  );
};

export default EditUser;
