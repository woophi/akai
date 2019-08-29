import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { dislikeBlog, likeBlog, getLikeState } from './operations';

type Props = {
  blogId: string;
}

export const Like = React.memo<Props>(({ blogId }) => {
  const [animate, setAnimate] = React.useState(null);
  const classes = useStyles({ selected: !!animate });

  React.useEffect(() => {
    getLikeState(blogId).then(r => {
      setAnimate(!r ? null : classes.is_animating);
    })
  }, [blogId])

  const handleClick = () => {
    if (animate) {
      dislikeBlog(blogId);
    } else {
      likeBlog(blogId);
    }
    setAnimate(animate ? null : classes.is_animating);
  };

  return (
    <div onClick={handleClick} className={`${classes.heart}  ${animate || ''}`} />
  );
});

const useStyles = makeStyles(theme => ({
  heart: ({ selected }: {selected: boolean}) => ({
    cursor: 'pointer',
    height: '60px',
    width: '60px',
    backgroundImage: `url( '/static/img/like_anim.png')`,
    backgroundPosition: selected ? 'right' : 'left',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '2900%',
    margin: 'auto'
  }),
  is_animating: {
    animation: '$heart-burst .8s steps(28) 1'
  },
  '@keyframes heart-burst': {
    from: {
      backgroundPosition: 'left'
    },
    to: {
      backgroundPosition: 'right'
    }
  }
}));
