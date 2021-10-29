import Box from '@material-ui/core/Box';
import { useAppSelector } from 'core/reducers/rootReducer';
import { getAdminBioData } from 'core/selectors';
import * as React from 'react';
import { fetchFiles } from '../operations';
import { BioForm } from './Form';
import { getBio } from './operations';

export const AdminBio = React.memo(() => {
  const bio = useAppSelector(getAdminBioData);
  React.useEffect(() => {
    getBio();
    fetchFiles();
  }, []);

  return (
    <>
      <Box flexDirection="column" flex={1}>
        <BioForm initialValues={bio} />
      </Box>
    </>
  );
});
