import Link from 'next/link';
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
import ProTip from 'components/ProTip';

const styles = (theme: Theme): any => ({
  root: {
    textAlign: 'center',
    paddingTop: '20px'
  },
  block: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  m3: {
    margin: '16px auto'
  }
});

type Props = {
  classes: any;
} & WithTranslation;

type LocalState = {
  open: boolean;
};

class Index extends React.Component<Props, LocalState> {
  state: LocalState = {
    open: false
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  handleClick = () => {
    this.setState({
      open: true
    });
  };

  handleFbLogin = () => {
    window.open('/setup/fb', 'blank');
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
          <Link href="/blog">
            <a>Go to the blog page</a>
          </Link>
        </Typography>
        <Typography gutterBottom>
          <Link href="/login">
            <a>Go to the login page</a>
          </Link>
        </Typography>
        <div className={classes.block}>
          <Button
            variant="contained"
            color="secondary"
            onClick={this.handleClick}
            className={classes.m3}
          >
            Super Secret Password
          </Button>
          {t('extendedComponent')}
          <Button
            color="primary"
            onClick={this.handleFbLogin}
            className={classes.m3}
          >
            login fb
          </Button>
          <ProTip />
        </div>
      </div>
    );
  }
}

export default withTranslation(['common'])(withStyles(styles)(Index));
