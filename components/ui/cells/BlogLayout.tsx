import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { H1, Spinner, BoxContent } from 'ui/atoms';
import { BlogModel } from 'core/models';

import { Carousel } from 'react-responsive-carousel';
import Typography from '@material-ui/core/Typography';
import { useMediaQuery } from '@material-ui/core';
import { Comments, Like, Shares } from 'ui/molecules';
import { getWindow } from 'core/common';

type Props = {
  blog: BlogModel;
};

export const BlogLayout = React.memo<Props>(({ blog }) => {
  const isSmallEnough = useMediaQuery('(max-width:800px)');
  const classes = useStyles({ isSmallEnough });
  const [w, setW] = React.useState(null);

  React.useEffect(() => {
    setW(getWindow());
  }, [])

  if (!blog) {
    return <Spinner withBox />;
  }

  return (
    <BoxContent>
      <H1 upperCase>{blog.title}</H1>
      <div className={classes.wrap}>
        <div className={classes.wrapCarusel}>
          <Carousel
            autoPlay={false}
            showStatus={false}
            showThumbs={blog.photos.length > 1}
            className={classes.carusel}
          >
            {blog.photos.map((p, index) => (
              <div key={`sl-${index}`} className={classes.caruselItem}>
                <img src={p.url} alt={p.name} className={classes.caruselImg} />
              </div>
            ))}
          </Carousel>
          <div className={classes.info}>
            <Shares linkToShare={w ? w.location.href : ''} />
            <Like blogId={blog.id} />
            {blog.topic}
            {blog.parameters.map((p, i) => (
              <div key={i}>
                {p.name}: {p.value}
              </div>
            ))}
          </div>
        </div>
        <Typography
          variant="body1"
          gutterBottom
          className={classes.text}
          dangerouslySetInnerHTML={{ __html: blog.body }}
        />
        <Comments />
      </div>
    </BoxContent>
  );
});

const useStyles = makeStyles(theme => ({
  wrap: {
    display: 'flex',
    margin: '2rem 0',
    flexDirection: 'column'
  },
  wrapCarusel: {
    display: 'flex',
    flexWrap: 'wrap',
    height: '100%',
    width: '100%',
    justifyContent: 'center'
  },
  info: {
    margin: '0 1rem 1rem'
  },
  carusel: {
    height: '100%',
    minWidth: 320,
    maxWidth: 640
  },
  caruselItem: {
    display: 'flex',
    width: '100%',
    height: '100%'
  },
  caruselImg: {
    margin: 'auto',
    maxWidth: '100%'
  },
  text: ({ isSmallEnough }: { isSmallEnough: boolean }) => ({
    margin: isSmallEnough ? '1rem' : '1rem auto',
    minWidth: 300,
    maxWidth: 805
  })
}));
