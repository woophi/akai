import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
  h1: {
    margin: '2rem auto 1rem'
  }
}));

export const H1: React.FC = React.memo(({ children }) => {
  const classes = useStyles({});
  return <h1 className={classes.h1}>{children}</h1>;
});
