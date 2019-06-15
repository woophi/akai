import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect as redux } from 'react-redux';
import { AppState, AppDispatch } from 'core/models';
import { Dispatch } from 'redux';

type OwnProps = {
  videoId: string;
  videoTitle: string;
  ordinal: number;
};

type Props = {
  selectedVideoId: string;
  selectVideoId: (payload: string) => void;
} & OwnProps;

const VideoModuleItemComponent: React.FC<Props> = React.memo(
  ({ videoId, videoTitle, ordinal, selectVideoId, selectedVideoId }) => {
    const classes = useStyles({ seleceted: selectedVideoId === videoId });

    React.useEffect(() => {
      if (ordinal === 0) {
        selectVideoId(videoId);
      }
    }, []);

    return (
      <div
        className={classes.videoContentItem}
        onClick={() => selectVideoId(videoId)}
      >
        <div className={classes.videoContentItemImg}>
          <img
            src={`https://img.youtube.com/vi/${videoId}/sddefault.jpg`}
            alt={videoTitle}
          />
        </div>
        <span className={classes.videoContentItemImgText}>{videoTitle}</span>
      </div>
    );
  }
);

export const VideoModuleItem = redux(
  (state: AppState, props: OwnProps) => ({
    selectedVideoId: state.ui.youtube.selectedVideoId
  }),
  (dispatch: Dispatch<AppDispatch>) => ({
    selectVideoId: (payload: string) => {
      dispatch({ type: 'SET_VIDEO_ID', payload });
    }
  })
)(VideoModuleItemComponent);

const useStyles = makeStyles(theme => ({
  videoContentItem: ({ seleceted }: {seleceted: boolean}) => ({
    display: 'flex',
    height: 50,
    backgroundColor: seleceted ? '#525252' : '#232323',
    cursor: 'pointer',
    boxShadow: '0px 8px 20px 0px rgba(0,0,0,0.39)',
    '&:active': {
      transform: 'translateY(1px)',
      boxShadow: 'none'
    },
    transition: '.2s ease-in-out'
  }),
  videoContentItemImg: {
    minWidth: 75,
    height: 50,
    '&>img': {
      maxWidth: '100%',
      maxHeight: '100%'
    }
  },
  videoContentItemImgText: {
    color: theme.palette.text.secondary,
    padding: '.5rem .25rem',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
}));
