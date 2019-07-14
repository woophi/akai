import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { H1, SocialButtons, BoxContent } from 'ui/atoms';
import getConfig from 'next/config';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'server/lib/i18n';

const { publicRuntimeConfig } = getConfig();
const { CHANNEL_ID, CHAT_VIDEO_ID, CHAT_DOMAIN } = publicRuntimeConfig;

export const OnlineLayout = React.memo(() => {
  const classes = useStyles({});
  const { t } = useTranslation();
  return (
    <BoxContent>
      <H1 upperCase>{t('common:video.online.title')}</H1>
      <div className={classes.wrap}>
        <div className={classes.stream}>
          <iframe
            width="100%"
            height="315"
            src={`https://www.youtube.com/embed/live_stream?channel=${CHANNEL_ID}`}
            frameBorder="0"
            allowFullScreen
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          />
          <Typography
            variant="button"
            display="block"
            gutterBottom
            className={classes.m12}
          >
            {t('common:video.online.atelier')}
          </Typography>
          <Typography
            variant="h5"
            display="block"
            gutterBottom
            className={classes.m12}
          >
            {t('common:AA')}
          </Typography>
          <SocialButtons />
        </div>
        <iframe
          frameBorder="0"
          height="750"
          width="480"
          src={`https://www.youtube.com/live_chat?v=${CHAT_VIDEO_ID}&embed_domain=${CHAT_DOMAIN}`}
          className={classes.chat}
        />
      </div>
    </BoxContent>
  );
});

const useStyles = makeStyles(theme => ({
  wrap: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '2rem 0',
    justifyContent: 'center',
    alignItems: 'center'
  },
  chat: {
    padding: '1rem'
  },
  stream: {
    marginBottom: 'auto',
    paddingTop: '1rem',
    minWidth: 320,
    width: 560
  },
  m12: {
    marginLeft: '.5rem'
  }
}));
