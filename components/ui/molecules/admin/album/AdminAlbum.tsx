import * as React from 'react';
import Box from '@material-ui/core/Box';
import { AlbumForm } from './Form';
import { getAlbumData, getAllBlogs } from './operations';
import { fetchFiles } from '../uploader/operations';

type Props = {
  albumId?: string;
};

export const AdminAlbumComponent = React.memo<Props>(({ albumId }) => {
  const [albumData, setAlbumData] = React.useState(null);

  React.useEffect(() => {
    if (albumId) {
      getAllBlogs();
      fetchFiles();
      getAlbumData(albumId).then(setAlbumData);
    }
  }, [albumId]);

  return <AlbumForm albumId={albumId} initialValues={albumData} />;
});
