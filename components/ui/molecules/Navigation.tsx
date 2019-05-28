import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LinkButton, Logo, ArrowTooltip } from '../atoms';
import { ZIndexes } from '../constants';
import { Languages } from './Languages';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Drawer, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';


export const Navigation: React.FC = React.memo(() => {
  const classes = useStyles();
  const isSmallEnough = useMediaQuery('(max-width:800px)');
  console.warn(isSmallEnough);
  if (isSmallEnough) {
    return <MobileNavigation />
  }
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

const MobileNavigation: React.FC = React.memo(() => {
  const classes = useStyles();
  const [openedMenu, setOpen] = React.useState(false);
  const toggle = () => setOpen(!openedMenu);
  return (
    <nav className={`${classes.nav} ${classes.navMobile}`}>
      <Logo classNameLogo={classes.mobileLogo} />
      <IconButton
        color="secondary"
        className={classes.iconButton}
        onClick={toggle}
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor="right" open={openedMenu} onClose={toggle}>
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
        <Languages />
      </Drawer>
    </nav>
  )
});

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
    justifyContent: 'space-evenly',
    minHeight: 84
  },
  mobileLogo: {
    right: '260px !important',
    left: 'unset'
  },
  iconButton: {
    padding: 10
  },
  navMobile: {
    justifyContent: 'space-between'
  }
}));
