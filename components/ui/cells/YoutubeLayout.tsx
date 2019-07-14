import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { H1, BoxContent } from 'ui/atoms';
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
    <BoxContent>
      <H1 upperCase>{t('common:video.youtube.title')}</H1>
      <div className={classes.wrap}>
        <VideoModule youtubeItems={items} />
      </div>
    </BoxContent>
  );
});

const useStyles = makeStyles(theme => ({
  wrap: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '2rem 0'
  }
}));
