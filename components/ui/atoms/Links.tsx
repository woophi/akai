import * as React from 'react';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

type Props = {
  href: string;
  label: React.ReactNode;
};

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary
  }
}));

export const LinkButton: React.FC<Props> = React.memo(({ href, label }) => {
  const classes = useStyles();
  return (
    <Button className={classes.button}>
      <Link href={href}>
        <a className={classes.link}>{label}</a>
      </Link>
    </Button>
  );
});
