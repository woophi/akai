import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { useAppSelector } from 'core/reducers/rootReducer';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useTranslation } from 'server/lib/i18n';
import { AddComment } from './AddComment';
import { Comment } from './Comment';
import { getComments } from './operations';

export const Comments = React.memo(() => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { query } = useRouter();
  const blogId = String(query.id);
  const comments = useAppSelector(state => state.ui.blogs[blogId]);

  React.useEffect(() => {
    getComments(blogId);
  }, []);

  const content = React.useMemo(() => {
    if (comments) {
      return comments.map(c => <Comment key={c.id} {...c} />);
    }
    return null;
  }, [comments]);

  return (
    <div className={classes.root}>
      <Typography gutterBottom variant="body1">
        {t('gallery.comments')}
      </Typography>
      <Divider variant="fullWidth" />
      <div className={classes.wraper}>{content}</div>
      <AddComment blogId={blogId} />
    </div>
  );
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: '600px',
      margin: ' 0 auto',
      width: '100%',
      padding: '1rem',
    },
    wraper: {
      position: 'relative',
      minHeight: '90px',
      marginTop: '1rem',
    },
  })
);
