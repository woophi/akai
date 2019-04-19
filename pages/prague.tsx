import * as React from 'react';
import { callApi } from 'core/common';
import { withStyles, Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Link from 'next/link'

const styles = (theme: Theme): any => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  }
});

type Props = {
  data: {
    title: string;
    body: string;
  },
  classes?: any
}


export class Prague extends React.PureComponent<Props> {
  static async getInitialProps () {
    const data = await callApi<{ title: string; body: string; }>('get', '/api/guest/blog?city=prague', null);

    return { data };
  }

  render() {
    const { data: { body, title } } = this.props;
    return (
      <div className={this.props.classes.root}>
        <div>{title}</div>
        <div>{body}</div>
        <Typography gutterBottom>
          <Link href="/">
            <a>Go to the main page</a>
          </Link>
        </Typography>
      </div>
    )
  }
}

export default withStyles(styles)(Prague);
