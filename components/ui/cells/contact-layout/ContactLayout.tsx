import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { H1, BoxContent } from 'ui/atoms';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Icon from '@material-ui/core/Icon';
import { ContactForm } from './ContactForm';
import { useTranslation } from 'server/lib/i18n';

export const ContactLayout: React.FC = React.memo(() => {
  const classes = useStyles({});
  const { t } = useTranslation();
  return (
    <BoxContent>
      <H1 upperCase>{t('common:contact.title')}</H1>
      <Typography
        className={classes.m}
        variant="button"
        display="block"
        gutterBottom
      >
        {t('common:contact.orders')}
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
    </BoxContent>
  );
});

const useStyles = makeStyles(theme => ({
  m: {
    margin: '0 auto 1rem'
  },
  text: {
    display: 'flex',
    justifyContent: 'space-evnly'
  }
}));
