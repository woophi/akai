import Box from '@material-ui/core/Box';
import { useAppSelector } from 'core/reducers/rootReducer';
import { getAdminYoutubes } from 'core/selectors';
import * as React from 'react';
import { VideoModule } from 'ui/molecules/VideoModule';
import { YoutubeForm } from './Form';
import { NewYoutube } from './NewYoutube';
import { getAllYoutubes } from './operations';

export const AdminYoutube = React.memo(() => {
  const youtubes = useAppSelector(getAdminYoutubes);
  React.useEffect(() => {
    getAllYoutubes();
  }, []);

  return (
    <Box flexDirection="column" flex={1}>
      <NewYoutube />
      <Box flexWrap={'wrap'} display={'flex'} margin={'2rem 0'}>
        <VideoModule youtubeItems={youtubes} />
      </Box>
      <YoutubeForm initialValues={{ youtubes }} />
    </Box>
  );
});
