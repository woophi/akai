import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { H1, Block } from 'ui/atoms';

export const VideoLayout: React.FC = React.memo(() => {
  const classes = useStyles();

  return (
    <div className={classes.content}>
      <H1>Video</H1>
      <div className={classes.wrap}>
        <Block
          title={'Online Stream'}
          imgSrc="static/img/watch_online.jpg"
          subTitle={'watch'}
          href="online"
        />
        <Block
          title={'Youtube Video'}
          imgSrc="static/img/youtube.jpg"
          subTitle={'watch'}
          href="youtube"
        />
      </div>
    </div>
  );
});

const useStyles = makeStyles(theme => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  wrap: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '2rem 0'
  }
}));
