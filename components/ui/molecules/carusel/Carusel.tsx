import * as React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { makeStyles } from '@material-ui/core/styles';
import { Spinner } from 'ui/atoms';
require('./override-carusel.css');

type Props = {
  imgs: {
    name: string,
    src: string
  }[]
}

const useStyles = makeStyles(theme => ({
  carusel: {
    height: '100%'
  }
}));

export const Carusel: React.FC<Props> = React.memo(({
  imgs = []
}) => {
  const classes = useStyles();
  if (!imgs || !imgs.length) {
    return <Spinner />
  }
  return (
    <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} className={classes.carusel}>
      {imgs.map((ig, index) => (
        <div key={`sl-${index}`} className={classes.carusel}>
          <img
            className={classes.carusel}
            src={ig.src}
            alt={ig.name}
          />
        </div>
      ))}
    </Carousel>
  );
});
