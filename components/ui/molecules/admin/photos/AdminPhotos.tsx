import * as React from 'react';
import { fetchFiles } from '../operations';
import { connect as redux } from 'react-redux';
import { AppState, PhotoItem } from 'core/models';
import { getAdminPhotos } from 'core/selectors';
import Box from '@material-ui/core/Box';
import { getAllPhotos } from './operations';
import { PhotosForm } from './Form';

type Props = {
  photos: PhotoItem[];
};
const AdminPhotosComponent = React.memo<Props>(({ photos = [] }) => {
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

export const AdminPhotos = redux((state: AppState) => ({
  photos: getAdminPhotos(state)
}))(AdminPhotosComponent);
