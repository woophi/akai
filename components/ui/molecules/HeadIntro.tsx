import { Box, Button, makeStyles, useMediaQuery } from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import PhoneForwardedIcon from '@material-ui/icons/PhoneForwarded';
import PlaceIcon from '@material-ui/icons/Place';
import { memo } from 'react';
import { SocialButtons } from 'ui/atoms';

export const HeadIntro = memo(() => {
  const isSmallEnough = useMediaQuery('(max-width:800px)');
  const classes = useStyles({ isSmallEnough });
  const margin = isSmallEnough ? '0 1rem' : '0.25rem .5rem';
  return (
    <Box display="flex" alignItems="center" flexWrap="wrap" className={classes.content}>
      <Box display="flex" justifyContent="center" alignItems="center" margin={margin} color="#fff">
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
      <Box display="flex" justifyContent="center" alignItems="center" margin={margin} color="#fff">
        <Button startIcon={<PhoneForwardedIcon />} href="tel:+420776561613" color="inherit" size="small">
          +420 776 561 613
        </Button>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" margin={margin} color="#fff">
        <Button startIcon={<MailIcon />} href="mailto:akaidoart@gmail.com" color="inherit" size="small">
          akaidoart@gmail.com
        </Button>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" margin={margin}>
        <SocialButtons size="s" />
      </Box>
    </Box>
  );
});

const useStyles = makeStyles(theme => ({
  content: ({ isSmallEnough }: { isSmallEnough: boolean }) => ({
    backgroundColor: '#353535',
    paddingLeft: isSmallEnough ? '' : '4rem',
    justifyContent: isSmallEnough ? 'center' : undefined,
  }),
}));
