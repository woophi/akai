import * as React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { makeStyles } from '@material-ui/core/styles';
import { LinkButton, Spinner } from 'ui/atoms';
import { SlideModel } from 'core/models';
import { Box, Button, Typography, useMediaQuery } from '@material-ui/core';

type Props = {
  slides: SlideModel[];
};

export const Carusel = React.memo<Props>(({ slides = [] }) => {
  const isMobile = useMediaQuery('(max-width:800px)');
  const classes = useStyles({ isMobile });
  if (!slides || !slides.length) {
    return <Spinner withBox />;
  }
  console.debug('sluids', slides);
  return (
    <Carousel autoPlay={false} infiniteLoop={false} showThumbs={false} showStatus={false} className={classes.carusel}>
      {slides.map((ig, index) => (
        <div key={`sl-${index}`} className={classes.carusel} style={{ backgroundImage: `url(${ig.src})` }}>
          <Box position="absolute" className={classes.layoutFront}>
            {ig.button.shopItemHref && (
              <>
                <Typography variant="h1" gutterBottom>
                  {ig.title}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  {ig.subTitle}
                </Typography>
                <LinkButton
                  href={`/product/${ig.button.shopItemHref}`}
                  color="primary"
                  variant="contained"
                  label={ig.button.name}
                  size="large"
                  className=""
                />
              </>
            )}
          </Box>
        </div>
      ))}
    </Carousel>
  );
});

const useStyles = makeStyles(theme => ({
  carusel: (p: { isMobile: boolean }) => ({
    height: '80vh',
    maxHeight: '80vh',
    position: 'relative',

    backgroundRepeat: 'no-repeat',
    backgroundSize: p.isMobile ? 'cover' : 'contain',
    backgroundPosition: 'center',
  }),
  layoutFront: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    backgroundColor: 'rgba(202, 188, 171,.12)',
    '&>h1': {
      fontSize: '58px',
      lineHeight: '58px',
      textTransform: 'uppercase',
      fontWeight: 700,
    },
    '&>h6': {
      fontSize: '1.5rem',
    },
    '&>button>span>a': {
      color: theme.palette.common.white,
    },
    '&:hover': {
      backgroundColor: 'rgba(202, 188, 171,0)',
    },
    transition: '.2s ease-in-out',
  },
}));
