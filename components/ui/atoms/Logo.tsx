import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';

type Props = {
  classNameLogo?: string;
  small?: boolean;
};

export const Logo = React.memo<Props>(({ classNameLogo = '', small = false }) => {
  const classes = useStyles({ small });
  return (
    <div className={classes.content}>
      <img className={`${classes.logoSign} ${classNameLogo}`} src="/img/akaisign.png" alt="logo_akai_akaev_sign" />
      <div className={classes.logoText}>
        <Link href="/">
          <a className={classes.link}>
            <span>Akai akaev</span>
            <span className={classes.subLink}>Official Website</span>
          </a>
        </Link>
      </div>
    </div>
  );
});

const useStyles = makeStyles(theme => ({
  content: {
    display: 'flex',
  },
  logoText: ({ small }: Props) => ({
    fontFamily: '"Cinzel", serif',
    fontSize: '25px',
    textTransform: 'uppercase',
    cursor: 'pointer',
    margin: `auto ${small ? '1' : '4'}rem`,
  }),
  logoSign: {
    position: 'absolute',
    top: '0px',
    left: '200px',
    opacity: 0.3,
    transform: 'rotate(7deg)',
    pointerEvents: 'none',
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
    display: 'flex',
    flexDirection: 'column',
  },
  subLink: {
    fontSize: '12px',
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },
}));
