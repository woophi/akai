import Link from 'next/link'
import * as React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import { withStyles, Theme } from '@material-ui/core/styles';
import { withTranslation, WithTranslation } from 'react-i18next';
import { zaeb } from 'core/operations';

const styles = (theme: Theme): any => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  }
});

type Props = {
  classes: any
} & WithTranslation;

type LocalState = {
  open: boolean
};

class Index extends React.Component<Props, LocalState> {
  state: LocalState = {
    open: false
  };

  componentDidMount() {
    zaeb();
  }

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleClick = () => {
    this.setState({
      open: true,
    });
  };

  render() {
    const { classes, t } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <Dialog open={open} onClose={this.handleClose}>
          <DialogTitle>Super Secret Password</DialogTitle>
          <DialogContent>
            <DialogContentText>1-2-3-4-5</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.handleClose}>
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <Typography gutterBottom>
          <Link href="/about">
            <a>Go to the about page</a>
          </Link>
        </Typography>
        <Typography gutterBottom>
          <Link href="/prague">
            <a>Go to the prague page</a>
          </Link>
        </Typography>
        <Button variant="contained" color="secondary" onClick={this.handleClick}>
          Super Secret Password
        </Button>
        {t('extendedComponent')}
      </div>
    );
  }
}

export default withTranslation(['common'])(withStyles(styles)(Index));
