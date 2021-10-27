import { Box, Button, makeStyles } from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import PhoneForwardedIcon from '@material-ui/icons/PhoneForwarded';
import PlaceIcon from '@material-ui/icons/Place';
import { memo } from 'react';
import { SocialButtons } from 'ui/atoms';

export const HeadIntro = memo(() => {
  const classes = useStyles({});
  return (
    <Box display="flex" justifyContent="center" alignItems="center" flexWrap="wrap" className={classes.content}>
      <Box display="flex" justifyContent="center" alignItems="center" margin="0.25rem .5rem" color="#fff" marginLeft="auto">
        <Button
          startIcon={<PlaceIcon />}
          href="https://goo.gl/maps/EKJ6expGRbri8wC39"
          target="_blank"
          color="inherit"
          size="small"
        >
          Karlův most, 110 00 Praha 1
        </Button>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" margin="0.25rem .5rem" color="#fff">
        <Button startIcon={<PhoneForwardedIcon />} href="tel:+420776561613" color="inherit" size="small">
          +420 776 561 613
        </Button>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" margin="0.25rem .5rem" color="#fff">
        <Button startIcon={<MailIcon />} href="mailto:akaidoart@gmail.com" color="inherit" size="small">
          akaidoart@gmail.com
        </Button>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" marginX="auto">
        <SocialButtons size="s" />
      </Box>
    </Box>
  );
});

const useStyles = makeStyles(theme => ({
  content: {
    backgroundColor: '#353535',
  },
}));
