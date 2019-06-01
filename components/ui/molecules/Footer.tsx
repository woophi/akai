import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { SocialButtons } from 'ui/atoms';

const useStyles = makeStyles(theme => ({
  footer: {
    padding: '7rem 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.palette.secondary.light
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
      <SocialButtons />
    </footer>
  );
});
