import { ensureNotAuthorized } from 'core/operations/auth';
import { adminShopActions } from 'core/reducers/admin/shop';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { AdminEditProduct, AdminLayout, getShopItem } from 'ui/index';
import { fetchFiles } from 'ui/molecules/admin/operations';

const EditProduct: React.FC = () => {
  const { query } = useRouter();
  const productId = String(query.productId);
  const dispatch = useDispatch();

  React.useEffect(() => {
    ensureNotAuthorized();
    fetchFiles();
    getShopItem(productId).then(d => dispatch(adminShopActions.selectItem(d)));
  }, [productId]);
  return (
    <AdminLayout>
      <AdminEditProduct />
    </AdminLayout>
  );
};

export default EditProduct;
