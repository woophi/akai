import { ensureNotAuthorized } from 'core/operations/auth';
import { adminShopActions } from 'core/reducers/admin/shop';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { AdminLayout } from 'ui/index';
import { AdminEditCategory, getShopCategory } from 'ui/molecules/admin/shop';

const EditCategory: React.FC = () => {
  const { query } = useRouter();
  const categoryId = String(query.categoryId);
  const dispatch = useDispatch();

  React.useEffect(() => {
    ensureNotAuthorized();
    getShopCategory(categoryId).then(d => dispatch(adminShopActions.selectCategory(d)));
  }, [categoryId]);
  return (
    <AdminLayout>
      <AdminEditCategory />
    </AdminLayout>
  );
};

export default EditCategory;
