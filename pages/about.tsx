import Link from 'next/link'
import * as React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles, Theme } from '@material-ui/core/styles';

const styles = (theme: Theme): any => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  }
});

type Props = {
  classes?: any;
}

class About extends React.PureComponent<Props> {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography variant="h4" gutterBottom>
          Material-UI
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          about page
        </Typography>
        <Typography gutterBottom>
          <Link href="/">
            <a>Go to the main page</a>
          </Link>
        </Typography>
        <Button variant="contained" color="primary">
          Do nothing button
        </Button>
      </div>
    )
  }
}

export default withStyles(styles)(About);
