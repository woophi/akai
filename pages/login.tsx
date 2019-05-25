import { withStyles, Theme } from '@material-ui/core/styles';
import { compose } from 'redux';
import * as React from 'react';
import { TextField, Button } from '@material-ui/core';
import { login } from 'core/operations';
import { connect as redux } from 'react-redux';
import { AppState } from 'core/models';

const styles = (theme: Theme): any => ({
  root: {
    textAlign: 'center',
    paddingTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  m3: {
    margin: '16px auto'
  }
});

type Props = {
  classes?: any,
  token: string
};
type LocalState = {
  email: string;
  password: string;
  token: string;
};


class Login extends React.PureComponent<Props, LocalState> {
  state: LocalState = {
    email: '',
    password: '',
    token: this.props.token
  };

  changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ email: e.target.value });
  }
  changePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: e.target.value });
  }

  handleLogin = () => {
    login(this.state.email, this.state.password)
      .then(r => this.setState({ token: r }));
  }

  render() {
    const { classes } = this.props;
    return (
      <>
        <div className={this.props.classes.root}>
          <TextField
            id="outlined-name"
            label="Email"
            className={classes.m3}
            value={this.state.email}
            onChange={this.changeEmail}
            margin="normal"
            variant="outlined"
            type="email"
          />
          <TextField
            id="outlined-body"
            label="Password"
            className={classes.m3}
            value={this.state.password}
            onChange={this.changePass}
            margin="normal"
            variant="outlined"
            type="password"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleLogin}
            className={classes.m3}
          >
            login
          </Button>
          {this.state.token && <p>{this.state.token}</p>}
        </div>
      </>
    )
  }
}

export default compose(
  redux((state: AppState) => ({
    token: state.ui.token
  })),
  withStyles(styles)
)(Login)
