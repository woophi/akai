import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LinkButton, Logo, ArrowTooltip } from '../atoms';
import { ZIndexes } from '../constants';
import { Languages } from './Languages';

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

export const Navigation: React.FC = React.memo(() => {
  const classes = useStyles();

  return (
    <nav className={classes.nav}>
      <Logo />
      <div>
        <LinkButton href="/about" label="Biography" />
        <ArrowTooltip
          title={
            <>
              <LinkButton insideTooltip href="/gallery/graphics" label="graphics" />
              <LinkButton insideTooltip href="/gallery/painting" label="painting" />
            </>
          }
          interactive
        >
          <span>
            <LinkButton href="/gallery" label="gallery" />
          </span>
        </ArrowTooltip>
        <ArrowTooltip
          title={
            <>
              <LinkButton insideTooltip href="/video/online" label="online" />
              <LinkButton insideTooltip href="/video/youtube" label="youtube" />
            </>
          }
          interactive
        >
          <span>
            <LinkButton href="/video" label="video" />
          </span>
        </ArrowTooltip>
        <LinkButton href="/photo" label="photo" />
        <LinkButton href="/contact" label="contact" />
      </div>
      <Languages />
    </nav>
  );
});
