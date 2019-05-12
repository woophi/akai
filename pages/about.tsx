import Link from 'next/link';
import * as React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles, Theme } from '@material-ui/core/styles';
import { Input, TextField } from '@material-ui/core';
import { uploadFilesForBlog } from 'core/common';
import { createBlog } from 'core/operations';

const styles = (theme: Theme): any => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20
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
  classes?: any;
};

type LocalState = {
  files: File[];
  title: string;
  body: string;
};

class About extends React.PureComponent<Props, LocalState> {
  state: LocalState = {
    files: [],
    body: '',
    title: ''
  };

  onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files['0'];
    if (file) {
      this.setState(state => ({ files: [...state.files, file] }));
    }
  };

  changeTitle = (e: React.ChangeEvent<HTMLInputElement>) =>  {
    this.setState({ title: e.target.value });
  }
  changeBody = (e: React.ChangeEvent<HTMLInputElement>) =>  {
    this.setState({ body: e.target.value });
  }

  createBlogPosst = async () => {
    const id = await createBlog({
      body: this.state.body,
      title: this.state.title
    });
    await uploadFilesForBlog(this.state.files, id);
    this.setState({
      body: '',
      title: '',
      files: []
    })
  };

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
        <div className={classes.block}>
          <TextField
            id="outlined-name"
            label="Title"
            className={classes.m3}
            value={this.state.title}
            onChange={this.changeTitle}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-body"
            label="Body"
            className={classes.m3}
            value={this.state.body}
            onChange={this.changeBody}
            margin="normal"
            variant="outlined"
          />
          <Input type="file" onChange={this.onUpload} className={classes.m3} />
          <Button
            variant="contained"
            color="primary"
            onClick={this.createBlogPosst}
            className={classes.m3}
          >
            new blog
          </Button>
        </div>
        {this.state.files.map((f, i) => (
          <img
            width="50px"
            height="50px"
            key={i + 123546}
            src={URL.createObjectURL(f)}
            alt={f.name}
          />
        ))}
      </div>
    );
  }
}

export default withStyles(styles)(About);
