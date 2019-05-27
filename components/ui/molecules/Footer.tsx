import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Icon, Typography } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  footer: {
    padding: '7rem 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  icon: {
    margin: theme.spacing(1),
    width: 30,
    '&:hover': {
      cursor: 'pointer'
    }
  },
  iFB: {
    '&:hover': {
      color: '#4267b2'
    }
  },
  iSkype: {
    '&:hover': {
      color: '#0078ca'
    }
  },
  vk: {
    '&:hover': {
      color: '#5b88bd'
    }
  },
  ig: {
    '&:hover': {
      color: '#000'
    }
  },
  ytube: {
    '&:hover': {
      color: '#dd2c00'
    }
  }
}));

export const Footer: React.FC = React.memo(() => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Typography variant="subtitle2" gutterBottom>
        © Akai Akaev {new Date().getFullYear()} Все права защищены.
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Разработано{' '}
        <Link
          component="a"
          variant="body2"
          href="https://vk.com/space_goose"
          target="_blank"
        >
          Konstantin Mikheev
        </Link>
      </Typography>
      <div>
        <Link
          component="a"
          variant="body2"
          href="https://www.facebook.com/furman2012"
          target="_blank"
        >
          <Icon
            className={clsx(classes.icon, 'fab fa-facebook-square', classes.iFB)}
            color="primary"
          />
        </Link>

        <Link
          component="a"
          variant="body2"
          href="skype:live:bd37f9fda1ce6827?call"
        >
          <Icon
            className={clsx(classes.icon, 'fab fa-skype', classes.iSkype)}
            color="primary"
          />
        </Link>
        <Link
          component="a"
          variant="body2"
          href="https://vk.com/id183126454"
          target="_blank"
        >
          <Icon
            className={clsx(classes.icon, 'fab fa-vk', classes.vk)}
            color="primary"
          />
        </Link>
        <Link
          component="a"
          variant="body2"
          href="https://www.instagram.com/akaidoart"
          target="_blank"
        >
          <Icon
            className={clsx(classes.icon, 'fab fa-instagram', classes.ig)}
            color="primary"
          />
        </Link>

        <Link
          component="a"
          variant="body2"
          href="https://www.youtube.com/channel/UCAkXly2PfDr412tYnNZHq3g"
          target="_blank"
        >
          <Icon
            className={clsx(classes.icon, 'fab fa-youtube', classes.ytube)}
            color="primary"
          />
        </Link>
      </div>
    </footer>
  );
});
