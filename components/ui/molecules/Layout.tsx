import { makeStyles } from '@material-ui/core/styles';
import { subscribe } from 'core/operations';
import Head from 'next/head';
import * as React from 'react';
import { ScrollButton } from 'ui/atoms';
import { Footer } from './Footer';
import { HeadIntro } from './HeadIntro';
import { Navigation } from './Navigation';
import { ShopCartSlide } from './ShopCartSlide';
import { Subscribe } from './Subscribe';

type Props = React.PropsWithChildren<{
  title?: string;
  hideSub?: boolean;
}>;

const useStyles = makeStyles(theme => ({
  content: {
    minHeight: '100vh',
  },
}));

export const Layout = React.memo<Props>(({ title, children, hideSub = false }) => {
  const classes = useStyles();

  const tt = title ? `Akai Akaev | ${title}` : 'Akai Akaev | Official website';

  return (
    <>
      <Head>
        <title>{tt}</title>
        <meta name="description" content="Akai Akaev showcases of wonderful works" />
        <meta name="keywords" content="photos, arts, actor, paints" />
      </Head>
      <header>
        <HeadIntro />
        <Navigation />
      </header>
      <div className={classes.content}>
        {children}
        {!hideSub && <Subscribe onSubscribe={subscribe} />}
        <Footer />
        <ShopCartSlide />
      </div>
      <ScrollButton />
    </>
  );
});
