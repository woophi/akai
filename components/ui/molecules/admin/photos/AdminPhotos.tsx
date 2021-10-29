import Box from '@material-ui/core/Box';
import { useAppSelector } from 'core/reducers/rootReducer';
import { getAdminPhotos } from 'core/selectors';
import * as React from 'react';
import { fetchFiles } from '../operations';
import { PhotosForm } from './Form';
import { getAllPhotos } from './operations';

export const AdminPhotos = React.memo(({}) => {
  const photos = useAppSelector(getAdminPhotos);
  React.useEffect(() => {
    getAllPhotos();
    fetchFiles();
  }, []);

  return (
    <>
      <Box flexDirection="column" flex={1}>
        <PhotosForm initialValues={{ photos }} />
      </Box>
    </>
  );
});
