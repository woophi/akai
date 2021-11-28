import { Box } from '@material-ui/core';
import * as React from 'react';
import { OrdersList } from './List';

export const AdminOrders = React.memo(() => {
  return (
    <Box flexDirection="column" flex={1}>
      <OrdersList />
    </Box>
  );
});
