import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { H1, Block } from 'ui/atoms';
import { useTranslation } from 'server/lib/i18n';

export const VideoLayout: React.FC = React.memo(() => {
  const classes = useStyles({});
  const { t } = useTranslation();
  return (
    <div className={classes.content}>
      <H1 upperCase>{t('common:video.title')}</H1>
      <div className={classes.wrap}>
        <Block
          title={t('common:video.online.title')}
          imgSrc="static/img/watch_online.jpg"
          subTitle={t('common:watch')}
          href="online"
        />
        <Block
          title={t('common:video.youtube.title')}
          imgSrc="static/img/youtube.jpg"
          subTitle={t('common:watch')}
          href="youtube"
        />
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
