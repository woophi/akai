import * as React from 'react';
import Box from '@material-ui/core/Box';
import { AlbumForm } from './Form';


export const AdminAlbumComponent = React.memo(() => {

  return (
    <Box display="flex" flexWrap="nowrap" justifyContent="space-evenly">
      <AlbumForm />
    </Box>
  )
})
