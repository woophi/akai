import { Box, Button, Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { useTranslation } from 'server/lib/i18n';
import { BoxGrid, H1, SocialButtons } from 'ui/atoms';
import { ContactForm } from './ContactForm';
import MailIcon from '@material-ui/icons/Mail';
import PhoneForwardedIcon from '@material-ui/icons/PhoneForwarded';
import PlaceIcon from '@material-ui/icons/Place';

export const ContactLayout = React.memo(() => {
  const isSmallEnough = useMediaQuery('(max-width:800px)');
  const classes = useStyles({ isSmallEnough });
  const { t } = useTranslation();
  return (
    <>
      <Box maxWidth="1200px" margin="1rem auto 2rem" display="flex">
        <H1>{t('common:contact.title')}</H1>
      </Box>
      <BoxGrid>
        <Box>
          <Box display="flex" flexDirection="column" alignItems="flex-start" padding="1rem">
            <Typography variant="h6" gutterBottom component="b">
              Akai Akaev
            </Typography>
            <Button startIcon={<PlaceIcon />} href="https://goo.gl/maps/EKJ6expGRbri8wC39" target="_blank" size="small">
              Karlův most, 110 00 Praha 1
            </Button>

            <Button startIcon={<PhoneForwardedIcon />} href="tel:+420776561613" size="small">
              +420 776 561 613
            </Button>
            <Button startIcon={<MailIcon />} href="mailto:akaidoart@gmail.com" size="small">
              akaidoart@gmail.com
            </Button>
            <Box display="flex">
              <SocialButtons size="s" />
            </Box>
          </Box>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2559.9898404746345!2d14.40924791571821!3d50.086477079426835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470b94e5e58eb59f%3A0x75209738d1d3b126!2sKarl%C5%AFv%20most!5e0!3m2!1scs!2scz!4v1635432622144!5m2!1scs!2scz"
            className={classes.iframe}
            allowFullScreen={false}
            {...{ loading: 'lazy' }}
          />
        </Box>
        <ContactForm />
      </BoxGrid>
    </>
  );
});

const useStyles = makeStyles(theme => ({
  iframe: (p: { isSmallEnough: boolean }) => ({
    width: p.isSmallEnough ? '100%' : '600px',
    height: '450px',
    border: 0,
  }),
}));
