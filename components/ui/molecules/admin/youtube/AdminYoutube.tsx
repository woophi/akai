import * as React from 'react';
import { connect as redux } from 'react-redux';
import { YoutubeItem, AppState } from 'core/models';
import Box from '@material-ui/core/Box';
import { VideoModule } from 'ui/molecules/VideoModule';
import { getAdminYoutubes } from 'core/selectors';
import { getAllYoutubes } from './operations';
import { YoutubeForm } from './Form';
import { NewYoutube } from './NewYoutube';

type Props = {
  youtubes: YoutubeItem[];
};
const AdminYoutubeComponent = React.memo<Props>(({ youtubes = [] }) => {
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

export const AdminYoutube = redux((state: AppState) => ({
  youtubes: getAdminYoutubes(state)
}))(AdminYoutubeComponent);
