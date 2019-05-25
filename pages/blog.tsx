import * as React from 'react';
import { callApi } from 'core/common';
import { withStyles, Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Link from 'next/link';

const styles = (theme: Theme): any => ({
  root: {
    textAlign: 'center',
    paddingTop: '20px'
  }
});

const PostLink = props => (
  <li>
    <Link as={`/p/${props.id}`} href={`/post?title=${props.title}&id=${props.id}`}>
      <a>{props.title}</a>
    </Link>
  </li>
);

type BlogData = {
  id: string;
  title: string;
};

type Props = {
  data: BlogData[];
  classes?: any;
};

class Blog extends React.PureComponent<Props> {
  static async getInitialProps() {
    const data = await callApi<BlogData[]>('get', 'api/guest/blogs');

    return { data };
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <h1>My Blog</h1>
        <ul>
          {this.props.data.map(blog => (
            <PostLink key={blog.id} id={blog.id} title={blog.title} />
          ))}
        </ul>
        <Typography gutterBottom>
          <Link href="/">
            <a>Go to the main page</a>
          </Link>
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles)(Blog);
