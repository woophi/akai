import { Box } from '@material-ui/core';
import * as React from 'react';
import { LinkButton } from 'ui/atoms';
import { UsersList } from './List';

export const AdminUsers = React.memo(() => {
  return (
    <Box flexDirection="column" flex={1}>
      <LinkButton
        href="/admin/create/user"
        color="primary"
        variant="contained"
        label="Создать нового пользователя"
        style={{
          marginLeft: 16,
        }}
      />
      <UsersList />
    </Box>
  );
});
