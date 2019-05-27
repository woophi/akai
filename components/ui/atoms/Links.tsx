import * as React from 'react';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Fab } from '@material-ui/core';

type Props = {
  href: string;
  label: React.ReactNode;
  insideTooltip?: boolean;
};

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary
  },
  fabText: {
    textDecoration: 'none',
    fontSize: 12,
    color: `${theme.palette.text.secondary} !important`
  }
}));

export const LinkButton: React.FC<Props> = React.memo(
  ({ href, label, insideTooltip = false }) => {
    const classes = useStyles();
    if (insideTooltip) {
      return (
        <Button
          className={classes.button}
          variant="outlined"
          size="small"
          color="primary"
        >
          <Link href={href}>
            <a className={classes.fabText}>
              {label}
            </a>
          </Link>
        </Button>
      )
    }
    return (
      <Button
        className={classes.button}
      >
        <Link href={href}>
          <a className={classes.link}>
            {label}
          </a>
        </Link>
      </Button>
    );
  }
);
