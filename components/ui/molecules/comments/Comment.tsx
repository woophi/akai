import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { MenuComment } from './Menu';
import { makeStyles } from '@material-ui/styles';

export const Comments = React.memo(() => {
  const classes = useStyles({});
  return (
    <Paper elevation={4} className={classes.paper}>
      <div className={classes.topText}>
        <Avatar
          src={
            'https://res.cloudinary.com/dqbo8zk4k/image/upload/v1557654437/dzwppgtncprsxy6n7xo4.jpg'
          }
          className={classes.avatar}
        />
        <div className={classes.text}>
          <Typography component="p">nickanme</Typography>
          <Typography component="p">2019-05-05 12:20</Typography>
        </div>
        <MenuComment />
      </div>
      <Typography component="p">
        Paper can be used to build surface or other elements for your application.
        Paper can be used to build surface or other elements for your application.
        Paper can be used to build surface or other elements for your application.
        Paper can be used to build surface or other elements for your application.
        Paper can be used to build surface or other elements for your application.
        Paper can be used to build surface or other elements for your application.
        Paper can be used to build surface or other elements for your application.
        Paper can be used to build surface or other elements for your application.
        Paper can be used to build surface or other elements for your application.
        Paper can be used to build surface or other elements for your application.
        Paper can be used to build surface or other elements for your application.
        Paper can be used to build surface or other elements for your application.
        Paper can be used to build surface or other elements for your application.
        Paper can be used to build surface or other elements for your application.
        Paper can be used to build surface or other elements for your application.
        Paper can be used to build surface or other elements for your application.
      </Typography>
    </Paper>
  );
});

const useStyles = makeStyles(theme => ({
  paper: {
    margin: '0 auto .5rem',
    padding: '1rem',
    maxWidth: '600px'
  },
  topText: {
    display: 'flex',
    position: 'relative',
    marginBottom: '.75rem'
  },
  avatar: {
    margin: 'auto 1rem auto 0'
  },
  text: {
    display: 'flex',
    flexDirection: 'column'
  }
}));
