import * as React from 'react';
import Head from 'next/head';
import { Navigation } from './Navigation';
import { makeStyles } from '@material-ui/core/styles';
import { ScrollButton } from 'ui/atoms';
import { Subscribe } from './Subscribe';
import { subscribe } from 'core/operations';
import { Footer } from './Footer';

type Props = {
  title?: string;
};

const useStyles = makeStyles(theme => ({
  content: {
    paddingTop: '84px',
    minHeight: '100vh'
  }
}));

export const Layout: React.FC<Props> = React.memo(
  ({ title = 'Akai Akaev', children }) => {
    const classes = useStyles();
    return (
      <>
        <Head>
          <title>{title}</title>
          <meta name="description" content="Akai Akaev showcases of wonderful works" />
	        <meta name="keywords" content="photos, arts, actor, paints" />
        </Head>
        <header>
          <Navigation />
        </header>
        <div className={classes.content}>
          {children}
          <Subscribe onSubscribe={subscribe} />
          <Footer />
        </div>
        <ScrollButton />
      </>
    );
  }
);
