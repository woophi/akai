import { Box } from '@material-ui/core';
import { getSCategory } from 'core/selectors';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { EditCategory } from './EditCategory';

export const AdminEditCategory = React.memo(() => {
  const category = useSelector(getSCategory);

  if (!category) return null;
  return (
    <Box flexDirection="column" flex={1}>
      <EditCategory initialValues={category} />
    </Box>
  );
});
