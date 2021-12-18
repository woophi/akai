import { Box } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MenuIcon from '@material-ui/icons/Menu';
import * as React from 'react';
import { useTranslation } from 'server/lib/i18n';
import { ArrowTooltip, LinkButton, Logo } from '../atoms';
import { Languages, SelectLanguage } from './Languages';
import { NavAccount } from './NavAccount';

export const Navigation = React.memo(() => {
  const isSmallEnough = useMediaQuery('(max-width:800px)');
  const { t } = useTranslation();
  const classes = useStyles({});

  if (isSmallEnough) {
    return <MobileNavigation />;
  }
  return (
    <nav className={classes.nav}>
      <Logo />
      <Box margin="auto 0 auto 74px">
        <LinkButton href="/shop" label={t('common:navigation.shop')} />
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
        <SelectLanguage />
      </Box>
      <NavAccount />
    </nav>
  );
});

const MobileNavigation = React.memo(() => {
  const { t } = useTranslation();
  const classes = useStyles({});
  const [openedMenu, setOpen] = React.useState(false);
  const toggle = () => setOpen(!openedMenu);
  return (
    <nav className={`${classes.nav} ${classes.navMobile}`}>
      <Logo small />
      <IconButton color="secondary" className={classes.iconButton} onClick={toggle}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor="right" open={openedMenu} onClose={toggle}>
        <div className={classes.mobileContainer}>
          <div className={classes.mobileButtonsHC}>
            <NavAccount mobile />
            <IconButton color="primary" className={'fas fa-times'} onClick={toggle} />
          </div>
          <LinkButton
            href="/shop"
            label={t('common:navigation.shop')}
            variant={'contained'}
            color="primary"
            size="small"
            fullWidth
            className={classes.alignButton}
          />
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
    backgroundColor: theme.palette.primary.light,
    display: 'flex',
    minHeight: 84,
    position: 'relative',
  },
  iconButton: {
    padding: 10,
  },
  navMobile: {
    justifyContent: 'space-between',
  },
  mobileContainer: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 2rem 2rem',
    height: '100%',
    minWidth: '150px',
  },
  alignButton: {
    margin: '8px auto',
    padding: 0,
  },
  divider: {
    margin: '8px -2rem',
  },
  mobileButtonsHC: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '1rem',
  },
}));
