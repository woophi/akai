import { Box } from '@material-ui/core';
import { getSProduct } from 'core/selectors';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { EditProduct } from './EditProduct';

export const AdminEditProduct = React.memo(() => {
  const product = useSelector(getSProduct);

  if (!product) return null;
  return (
    <Box flexDirection="column" flex={1}>
      <EditProduct initialValues={product} />
    </Box>
  );
});
