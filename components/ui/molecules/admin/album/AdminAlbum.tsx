import * as React from 'react';
import { AlbumForm } from './Form';
import { getAlbumData } from './operations';
import { getAllBlogs, fetchFiles } from '../operations';

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
