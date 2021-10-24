import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { H1, Block, BoxContent } from 'ui/atoms';
import { useTranslation } from 'next-i18next';

export const VideoLayout: React.FC = React.memo(() => {
  const classes = useStyles({});
  const { t } = useTranslation();
  return (
    <BoxContent>
      <H1 upperCase>{t('common:video.title')}</H1>
      <div className={classes.wrap}>
        <Block
          title={t('common:video.online.title')}
          imgSrc="public/img/watch_online.jpg"
          subTitle={t('common:watch')}
          href="online"
        />
        <Block
          title={t('common:video.youtube.title')}
          imgSrc="public/img/youtube.jpg"
          subTitle={t('common:watch')}
          href="youtube"
        />
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
