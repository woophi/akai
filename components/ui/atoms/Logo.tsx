import * as React from 'react';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  content: {
    display: 'flex'
  },
  logoText: {
    fontFamily: '"Cinzel", serif',
    fontSize: '25px',
    textTransform: 'uppercase',
    cursor: 'pointer',
    margin: 'auto'
  },
  logoSign: {
    position: 'absolute',
    top: '-9px',
    left: '199px',
    opacity: 0.3,
    transform: 'rotate(7deg)',
    pointerEvents: 'none'
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary
  }
}));

export const Logo: React.FC = React.memo(() => {
  const classes = useStyles();
  return (
    <div className={classes.content}>
      <img
        className={classes.logoSign}
        src="/static/img/akaisign.png"
        alt="logo_akai_akaev_sign"
      />
      <div className={classes.logoText}>
        <Link href="/">
          <a className={classes.link}>Akai akaev</a>
        </Link>
      </div>
    </div>
  );
});
