import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { H1, Block } from 'ui/atoms';
import { BlogPreviewItem } from 'core/models';

type Props = {
  blogs: BlogPreviewItem[]
  albumTitle: string;
}

export const AlbumLayout: React.FC<Props> = React.memo(({
  blogs,
  albumTitle
}) => {
  const classes = useStyles({});

  return (
    <div className={classes.content}>
      <H1 upperCase>{albumTitle}</H1>
      <div className={classes.wrap}>
        {blogs.map((b, i) => (
          <Block
            key={i}
            title={b.title}
            imgSrc={b.coverPhoto}
            subTitle={'watch'}
            href={b.id}
          />
        ))}
      </div>
    </div>
  );
});

const useStyles = makeStyles(theme => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  wrap: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '2rem 0'
  }
}));
