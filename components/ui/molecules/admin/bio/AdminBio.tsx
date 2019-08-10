import * as React from 'react';
import { fetchFiles } from '../operations';
import { connect as redux } from 'react-redux';
import { AppState, BioData } from 'core/models';
import { getAdminBioData } from 'core/selectors';
import Box from '@material-ui/core/Box';
import { BioForm } from './Form';
import { getBio } from './operations';

type Props = {
  bio: BioData;
};
const AdminBioComponent = React.memo<Props>(({ bio }) => {
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

export const AdminBio = redux((state: AppState) => ({
  bio: getAdminBioData(state)
}))(AdminBioComponent);
