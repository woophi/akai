import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';

export const BoxMain: React.FC = React.memo(({
  children
}) => {
  const classes = useStyles();
  return (
    <div className={classes.content}>
      {children}
    </div>
  )
});

const useStyles = makeStyles(theme => ({
  content: {
    height: '100%'
  }
}));
