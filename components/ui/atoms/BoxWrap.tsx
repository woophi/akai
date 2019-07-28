import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';

export const BoxWrap = React.memo(({
  children
}) => {
  const classes = useStyles({});
  return (
    <div className={classes.content}>
      {children}
    </div>
  )
});

const useStyles = makeStyles(theme => ({
  content: {
    display: 'flex',
    flexWrap: 'wrap',
  }
}));
