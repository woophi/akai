import Link from 'next/link'
import * as React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles, Theme } from '@material-ui/core/styles';
import { Input } from '@material-ui/core';
import { uploadFiles } from 'core/common';

const styles = (theme: Theme): any => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  }
});

type Props = {
  classes?: any;
}

type LocalState = {
  files: File[]
}

class About extends React.PureComponent<Props, LocalState> {

  state: LocalState = {
    files: []
  }

  onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files['0'];
    if (file) {
      this.setState(state => ({ files: [...state.files, file] }));
    }
  }

  submitFiles = async () => {
    await uploadFiles(this.state.files)
  }

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
        <Input
          type="file"
          onChange={this.onUpload}
        />
        <Button variant="contained" color="primary" onClick={this.submitFiles}>
          upload
        </Button>
        {this.state.files.map((f, i) => (
          <img
            key={i+123546}
            src={URL.createObjectURL(f)}
            alt={f.name}
          />
        ))}
      </div>
    )
  }
}

export default withStyles(styles)(About);
