import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LinkButton, Logo, ArrowTooltip } from '../atoms';
import { ZIndexes } from '../constants';
import { Languages } from './Languages';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import Link from 'next/link';
import { useTranslation } from 'server/lib/i18n';

export const Navigation: React.FC = React.memo(() => {
  const classes = useStyles({});
  const isSmallEnough = useMediaQuery('(max-width:800px)');
  if (isSmallEnough) {
    return <MobileNavigation />;
  }
  const { t } = useTranslation();
  return (
    <nav className={classes.nav}>
      <Logo />
      <div>
        <LinkButton href="/about" label={t('common:navigation.about')} />
        <LinkButton href="/gallery" label={t('common:navigation.gallery')} />
        <ArrowTooltip
          title={
            <>
              <LinkButton insideTooltip href="/video/online" label={t('common:navigation.online')} />
              <LinkButton insideTooltip href="/video/youtube" label={t('common:navigation.youtube')} />
            </>
          }
          interactive
        >
          <span>
            <LinkButton href="/video" label={t('common:navigation.video')} />
          </span>
        </ArrowTooltip>
        <LinkButton href="/photo" label={t('common:navigation.photo')} />
        <LinkButton href="/contact" label={t('common:navigation.contact')} />
      </div>
      <Languages />
    </nav>
  );
});

const MobileNavigation: React.FC = React.memo(() => {
  const classes = useStyles({});
  const [openedMenu, setOpen] = React.useState(false);
  const toggle = () => setOpen(!openedMenu);
  const { t } = useTranslation();
  return (
    <nav className={`${classes.nav} ${classes.navMobile}`}>
      <Logo classNameLogo={classes.mobileLogo} />
      <IconButton color="secondary" className={classes.iconButton} onClick={toggle}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor="right" open={openedMenu} onClose={toggle}>
        <div className={classes.mobileContainer}>
          <div className={classes.mobileButtonsHC}>
            <Link href="/">
              <IconButton color="primary" className={'fas fa-home'} />
            </Link>
            <IconButton color="primary" className={'fas fa-times'} onClick={toggle} />
          </div>
          <LinkButton
            href="/about"
            label={t('common:navigation.about')}
            variant={'contained'}
            color="primary"
            size="small"
            fullWidth
            className={classes.alignButton}
          />
          <LinkButton
            href="/gallery"
            label={t('common:navigation.gallery')}
            variant={'contained'}
            color="primary"
            size="small"
            fullWidth
            className={classes.alignButton}
          />
          <LinkButton
            href="/video"
            label={t('common:navigation.video')}
            variant={'contained'}
            color="primary"
            size="small"
            fullWidth
            className={classes.alignButton}
          />
          <LinkButton
            href="/photo"
            label={t('common:navigation.photo')}
            variant={'contained'}
            color="primary"
            size="small"
            fullWidth
            className={classes.alignButton}
          />
          <LinkButton
            href="/contact"
            label={t('common:navigation.contact')}
            variant={'contained'}
            color="primary"
            size="small"
            fullWidth
            className={classes.alignButton}
          />
          <Divider className={classes.divider} />
          <Languages />
        </div>
      </Drawer>
    </nav>
  );
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
    right: '85px !important',
    left: 'unset'
  },
  iconButton: {
    padding: 10
  },
  navMobile: {
    justifyContent: 'space-between'
  },
  mobileContainer: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 2rem 2rem',
    height: '100%',
    minWidth: '150px'
  },
  alignButton: {
    margin: '8px auto'
  },
  divider: {
    margin: '8px -2rem'
  },
  mobileButtonsHC: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '1rem',
  }
}));
