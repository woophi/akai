import * as React from 'react';
import { makeStyles } from '@material-ui/styles';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: theme.spacing(6, 0, 3),
  }
}));

export default function ProTip() {
  const classes = useStyles();
  return (
    <Typography className={classes.root} color="textSecondary">
      Pro tip: See more{' '}
      <Link href="https://material-ui.com/getting-started/page-layout-examples/">
        page layout examples
      </Link>{' '}
      on the Material-UI documentation.
    </Typography>
  );
}
