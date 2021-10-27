import * as React from 'react';
import Link from '@material-ui/core/Link';
import Icon from '@material-ui/core/Icon';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

type Props = {
  size?: 'm' | 's';
};

export const SocialButtons = React.memo<Props>(({ size = 'm' }) => {
  const classes = useStyles({ size });

  return (
    <>
      <Link
        className={classes.link}
        component="a"
        variant="body2"
        href="https://www.facebook.com/furman2012"
        target="_blank"
      >
        <Icon className={clsx(classes.icon, 'fab fa-facebook-square', classes.iFB)} color="primary" />
      </Link>

      <Link
        className={classes.link}
        component="a"
        variant="body2"
        href="https://www.instagram.com/portrait_praha/"
        target="_blank"
      >
        <Icon className={clsx(classes.icon, 'fab fa-instagram', classes.ig)} color="primary" />
      </Link>
      <Link className={classes.link} component="a" variant="body2" href="https://wa.me/15551234567" target="_blank">
        <Icon className={clsx(classes.icon, 'fab fa-whatsapp', classes.iWA)} color="primary" />
      </Link>

      <Link className={classes.link} component="a" variant="body2" href="https://pin.it/2KCBKsz" target="_blank">
        <Icon className={clsx(classes.icon, 'fab fa-pinterest', classes.iPinter)} color="primary" />
      </Link>
      <Link className={classes.link} component="a" variant="body2" href="https://vk.com/id183126454" target="_blank">
        <Icon className={clsx(classes.icon, 'fab fa-vk', classes.vk)} color="primary" />
      </Link>
      <Link
        className={classes.link}
        component="a"
        variant="body2"
        href="https://www.youtube.com/channel/UCAkXly2PfDr412tYnNZHq3g"
        target="_blank"
      >
        <Icon className={clsx(classes.icon, 'fab fa-youtube', classes.ytube)} color="primary" />
      </Link>
    </>
  );
});

const useStyles = makeStyles(theme => ({
  link: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textDecoration: 'none !important',
  },
  icon: ({ size }: Props) => ({
    margin: size === 's' ? '.5rem .25rem' : theme.spacing(1),
    width: size === 's' ? 25 : 30,
    fontSize: size === 's' ? '1.2rem' : undefined,
    '&:hover': {
      cursor: 'pointer',
      transform: 'scale(1.1)',
      transition: 'ease-in-out .2s',
    },
  }),
  iWA: {
    '&:hover': {
      color: '#128c7e',
    },
  },
  iFB: {
    '&:hover': {
      color: '#4267b2',
    },
  },
  iPinter: {
    '&:hover': {
      color: '#e60023',
    },
  },
  vk: {
    '&:hover': {
      color: '#5b88bd',
    },
  },
  ig: {
    '&:hover': {
      color: '#000',
    },
  },
  ytube: {
    '&:hover': {
      color: '#dd2c00',
    },
  },
}));
