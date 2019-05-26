import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LinkButton, Logo } from '../atoms';
import { ZIndexes } from '../constants';
import { Languages } from './Languages';

type Props = {};

const useStyles = makeStyles(theme => ({
  nav: {
    padding: '16px',
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: ZIndexes.navigationBar,
    backgroundColor: theme.palette.primary.light,
    display: 'flex',
    justifyContent: 'space-evenly'
  }
}));

export const Navigation: React.FC<Props> = React.memo(() => {
  const classes = useStyles();

  return (
    <nav className={classes.nav}>
      <Logo />
      <div>
        <LinkButton href="/about" label="Biography" />
        <LinkButton href="/gallery" label="gallery" />
        <LinkButton href="/video" label="video" />
        <LinkButton href="/photo" label="photo" />
        <LinkButton href="/contact" label="contact" />
      </div>
      <Languages />
    </nav>
  );
});
