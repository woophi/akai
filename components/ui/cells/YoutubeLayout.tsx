import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { H1, Block } from 'ui/atoms';

export const YoutubeLayout: React.FC = React.memo(() => {
  const classes = useStyles({});

  return (
    <div className={classes.content}>
      <H1 upperCase>Youtube</H1>
      <div className={classes.wrap}>
asdasd
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
