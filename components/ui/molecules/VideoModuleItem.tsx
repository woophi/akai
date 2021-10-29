import { makeStyles } from '@material-ui/core/styles';
import { useAppSelector } from 'core/reducers/rootReducer';
import { youtubeActions } from 'core/reducers/youtube';
import * as React from 'react';
import { useDispatch } from 'react-redux';

type Props = {
  videoId: string;
  videoTitle: string;
  ordinal: number;
  toggleLoading: (arg: boolean) => void;
};

export const VideoModuleItem = React.memo<Props>(({ videoId, videoTitle, ordinal, toggleLoading }) => {
  const selectedVideoId = useAppSelector(state => state.ui.youtube.selectedVideoId);
  const classes = useStyles({ seleceted: selectedVideoId === videoId });
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (ordinal === 0) {
      toggleVideo();
    }
  }, []);

  const toggleVideo = React.useCallback(() => {
    toggleLoading(true);
    dispatch(youtubeActions.setVideoId(videoId));
  }, [videoId]);

  return (
    <div className={classes.videoContentItem} onClick={toggleVideo}>
      <div className={classes.videoContentItemImg}>
        <img src={`https://img.youtube.com/vi/${videoId}/default.jpg`} alt={videoTitle} />
      </div>
      <span className={classes.videoContentItemImgText}>{videoTitle}</span>
    </div>
  );
});

const useStyles = makeStyles(theme => ({
  videoContentItem: ({ seleceted }: { seleceted: boolean }) => ({
    display: 'flex',
    height: 50,
    backgroundColor: seleceted ? '#525252' : '#232323',
    cursor: 'pointer',
    boxShadow: '0px 8px 20px 0px rgba(0,0,0,0.39)',
    '&:active': {
      transform: 'translateY(1px)',
      boxShadow: 'none',
    },
    '&:hover': {
      backgroundColor: '#3a3939',
    },
    transition: '.2s ease-in-out',
  }),
  videoContentItemImg: {
    minWidth: 75,
    height: 50,
    '&>img': {
      maxWidth: '100%',
      maxHeight: '100%',
    },
  },
  videoContentItemImgText: {
    color: theme.palette.text.secondary,
    padding: '.5rem .25rem',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));
