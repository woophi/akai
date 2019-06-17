import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { H1 } from 'ui/atoms';
import { VideoModule } from 'ui/molecules';
import { YoutubeItem } from 'core/models';
import { useTranslation } from 'server/lib/i18n';

type Props = {
  items: YoutubeItem[]
}

export const YoutubeLayout: React.FC<Props> = React.memo(({
  items
}) => {
  const classes = useStyles({});
  const { t } = useTranslation();
  return (
    <div className={classes.content}>
      <H1 upperCase>{t('common:video.youtube.title')}</H1>
      <div className={classes.wrap}>
        <VideoModule youtubeItems={items} />
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
