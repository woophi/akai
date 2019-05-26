import * as React from 'react';
import Head from 'next/head';
import { Navigation } from './Navigation';
import { makeStyles } from '@material-ui/core/styles';

type Props = {
  title?: string;
};

const useStyles = makeStyles(theme => ({
  content: {
    paddingTop: '100px',
    height: '100vh'
  }
}));

export const Layout: React.FC<Props> = React.memo(
  ({ title = 'Akai Akaev', children }) => {
    const classes = useStyles();
    return (
      <>
        <Head>
          <title>{title}</title>
        </Head>
        <header>
          <Navigation />
        </header>
        <div className={classes.content}>{children}</div>
        {/* <footer>
        I'm here to stay
      </footer> */}
      </>
    );
  }
);
