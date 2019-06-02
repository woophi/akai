import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { H1 } from 'ui/atoms';
import { Footer, Subscribe } from 'ui/molecules';
import Typography from '@material-ui/core/Typography';
import { subscribe } from 'core/operations';
import Link from '@material-ui/core/Link';
import Icon from '@material-ui/core/Icon';
import { ContactForm } from './ContactForm';

export const ContactLayout: React.FC = React.memo(() => {
  const classes = useStyles();
  return (
    <div className={classes.content}>
      <H1>CONTACT FORM</H1>
      <Typography
        className={classes.m}
        variant="button"
        display="block"
        gutterBottom
      >
        Your orders
      </Typography>
      <Link
        component="a"
        variant="body2"
        href="tel://00420776561613"
        target="_blank"
        className={classes.m}
      >
        <Typography
          variant="button"
          display="block"
          gutterBottom
          className={classes.text}
        >
          <Icon
            style={{ width: 30 }}
            className={'fas fa-mobile-alt'}
            color="primary"
          />
          <span>{'+ 420 776 561 613'}</span>
        </Typography>
      </Link>
      <Link
        component="a"
        variant="body2"
        href="mailto:akaidoart@gmail.com"
        target="_blank"
        className={classes.m}
      >
        <Typography
          variant="button"
          display="block"
          gutterBottom
          className={classes.text}
        >
          <Icon
            style={{ width: 30 }}
            className={'fas fa-envelope'}
            color="primary"
          />
          <span>{'akaidoart@gmail.com'}</span>
        </Typography>
      </Link>
      <ContactForm />
      <Subscribe onSubscribe={subscribe} />
      <Footer />
    </div>
  );
});

const useStyles = makeStyles(theme => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  m: {
    margin: '0 auto 1rem'
  },
  text: {
    display: 'flex',
    justifyContent: 'space-evnly'
  }
}));
