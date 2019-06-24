import * as React from 'react';
import { connect as redux } from 'react-redux';
import * as models from 'core/models';
import { Spinner } from 'ui/atoms';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { WithStyles, createStyles, Theme, withStyles } from '@material-ui/core';
import { compose } from 'redux';
import { withTranslation } from 'server/lib/i18n';
import { getComments } from './operations';
import { withRouter, WithRouterProps } from 'next/router';
import { AddComment } from './AddComment';
import { Comment } from './Comment';

const styles = (theme: Theme) => createStyles({
  root: {
    maxWidth: '600px',
    margin:' 0 auto',
    width: '100%',
    padding: '1rem',
  },
  wraper: {
    position: 'relative',
    minHeight: '90px',
    marginTop: '1rem'
  }
});


type Props = {
  comments: models.CommentItem[]
} & WithStyles<typeof styles> & models.TranslationProps & WithRouterProps;

class CommnetsComponent extends React.PureComponent<Props> {

  componentDidMount() {
    getComments(String(this.props.router.query.id));
  }

  get content() {
    return this.props.comments.map(c => (
      <Comment
        key={c.id}
        {...c}
      />
    ));
  }

  render() {
    const { classes, t, router: { query } } = this.props;
    return (
      <div className={classes.root}>
        <Typography gutterBottom variant="body1">
          {t('gallery.comments')}
        </Typography>
        <Divider variant="fullWidth" />
        <div className={classes.wraper}>
          {this.content}
        </div>
        <AddComment blogId={String(query.id)} />
      </div>
    )
  }
}

export const Comments = compose(
  redux((state: models.AppState) => ({
    comments: state.ui.comments
  })),
  withStyles(styles),
  withTranslation('common'),
  withRouter
)(CommnetsComponent);
