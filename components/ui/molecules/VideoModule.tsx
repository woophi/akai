import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { YoutubeItem, AppState } from 'core/models';
import { VideoModuleItem } from './VideoModuleItem';
import { connect as redux } from 'react-redux';

type OwnProps = {
  youtubeItems: YoutubeItem[];
};

type Props = {
  selectedVideoId: string;
} & OwnProps;

const VideoModuleComponent: React.FC<Props> = React.memo(
  ({ youtubeItems = [], selectedVideoId }) => {
    const classes = useStyles({});
    return (
      <div className={classes.videoModule}>
        <div className={classes.video}>
          {youtubeItems.length ? (
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideoId}`}
              frameBorder="0"
              allowFullScreen
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              width="100%"
              height="100%"
            />
          ) : (
            <div className={classes.noVideos}>No videos</div>
          )}
        </div>
        <div className={classes.videoContent}>
          {youtubeItems.map((yi, i) => (
            <VideoModuleItem
              key={yi.videoId + yi.title + i}
              videoId={yi.videoId}
              videoTitle={yi.title}
              ordinal={i}
            />
          ))}
        </div>
      </div>
    );
  }
);

export const VideoModule = redux((state: AppState, props: OwnProps) => ({
  selectedVideoId: state.ui.youtube.selectedVideoId
}))(VideoModuleComponent);

const useStyles = makeStyles(theme => ({
  videoModule: {
    display: 'flex',
    margin: 'auto',
    backgroundColor: '#232323',
    flexWrap: 'wrap'
  },
  video: {
    minWidth: 320,
    width: '40vw',
    display: 'flex',
    height: 450
  },
  videoContent: {
    width: 320,
    backgroundColor: '#232323',
    overflow: 'auto',
    maxHeight: 450,
    borderLeft: '1px solid'
  },
  noVideos: {
    margin: 'auto',
    color: theme.palette.text.secondary
  }
}));
