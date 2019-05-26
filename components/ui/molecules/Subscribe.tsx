import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Paper, InputBase, Divider, IconButton } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';

type Props = {};

const useStyles = makeStyles(theme => ({
  content: {
    padding: '3rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main
  },
  button: {
    margin: theme.spacing(2),
    color: theme.palette.text.secondary
  },
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    maxWidth: 400,
    width: '100%'
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4
  }
}));

export const Subscribe: React.FC = React.memo(() => {
  const classes = useStyles();
  return (
    <section className={classes.content}>
      <Button href="mailto:akaidoart@gmail.com" color="primary" variant="contained" className={classes.button}>
        E-mail
      </Button>
      <Paper className={classes.root}>
        <InputBase className={classes.input} placeholder="Subscribe" type="email" />
        <Divider className={classes.divider} />
        <IconButton
          color="primary"
          className={classes.iconButton}
          aria-label="Directions"
        >
          <EmailIcon />
        </IconButton>
      </Paper>
    </section>
  );
});
