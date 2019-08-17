import * as React from 'react';
import { Box } from '@material-ui/core';
import { LinkButton } from 'ui/atoms';

export const AdminUsers = React.memo(() => {

  return (
    <Box flexDirection="column" flex={1}>
      <LinkButton
        href="/admin/create/user"
        color="primary"
        variant="contained"
        label="Создать нового пользователя"
        style={{
          marginLeft: 16
        }}
      />
    </Box>
  );
});
