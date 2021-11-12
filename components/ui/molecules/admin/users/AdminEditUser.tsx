import { Box } from '@material-ui/core';
import { CreatableRole } from 'core/models';
import { useAppSelector } from 'core/reducers/rootReducer';
import * as React from 'react';
import { EditUser } from './EditUser';

export const AdminEditUser = React.memo(() => {
  const user = useAppSelector(s => s.ui.admin.user.selectedUser);
  return (
    <Box flexDirection="column" flex={1}>
      <EditUser
        initialValues={{
          _id: user._id,
          role: user.roles[0] as unknown as CreatableRole,
          email: user.email,
          name: user.name,
        }}
      />
    </Box>
  );
});
