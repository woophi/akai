import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Icon } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import clsx from 'clsx';

type Props = {};

const useStyles = makeStyles(theme => ({
  footer: {
    padding: '7rem 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  icon: {
    margin: theme.spacing(1)
  }
}));

export const Footer: React.FC = React.memo(() => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <div>© Akai Akaev {new Date().getFullYear()} Все права защищены.</div>
      <div>
        Разработано
        <Link
          component="button"
          variant="body2"
          href="https://vk.com/space_goose"
          target="_blank"
        >
          Konstantin Mikheev
        </Link>
      </div>
      <div>
        <Icon
          className={clsx(classes.icon, 'fab fa-facebook-square')}
          color="primary"
        />
        <Icon className={clsx(classes.icon, 'fab fa-skype')} color="primary" />
        <Icon className={clsx(classes.icon, 'fab fa-vk')} color="primary" />
        <Icon className={clsx(classes.icon, 'fab fa-instagram')} color="primary" />
        <Icon className={clsx(classes.icon, 'fab fa-youtube')} color="primary" />
      </div>
    </footer>
  );
});
