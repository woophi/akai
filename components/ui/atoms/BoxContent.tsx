import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';

export const BoxContent = React.memo(({ children }) => {
  const classes = useStyles({});
  return <div className={classes.content}>{children}</div>;
});
export const BoxGrid = React.memo(({ children }) => {
  const classes = useStyles({});
  return <div className={classes.grid}>{children}</div>;
});

const useStyles = makeStyles(theme => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  grid: {
    display: 'flex',
    justifyContent: 'space-around',
    maxWidth: '1200px',
    margin: '1rem auto 2rem',
    flexWrap: 'wrap',
  },
}));
