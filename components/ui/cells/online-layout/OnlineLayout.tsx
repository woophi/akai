import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { AppState } from 'core/models';
import { getLastChatLiveStreamId } from 'core/operations';
import getConfig from 'next/config';
import * as React from 'react';
import { connect as redux } from 'react-redux';
import { useTranslation } from 'server/lib/i18n';
import { BoxContent, H1 } from 'ui/atoms';
import { SaveChatId } from './SaveChatId';

const { publicRuntimeConfig } = getConfig();
const { CHANNEL_ID, CHAT_DOMAIN } = publicRuntimeConfig;

type Props = {
  chatId: string;
};

const OnlineLayoutComponent = React.memo<Props>(({ chatId }) => {
  const classes = useStyles({});
  const { t } = useTranslation();
  React.useEffect(() => {
    getLastChatLiveStreamId();
  }, []);

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
          <Typography variant="button" display="block" gutterBottom className={classes.m12}>
            {t('common:video.online.atelier')}
          </Typography>
          <Typography variant="h5" display="block" gutterBottom className={classes.m12}>
            {t('common:AA')}
          </Typography>
          <SaveChatId />
        </div>
        {chatId && (
          <iframe
            frameBorder="0"
            height="750"
            width="480"
            src={`https://www.youtube.com/live_chat?v=${chatId}&embed_domain=${CHAT_DOMAIN}`}
            className={classes.chat}
          />
        )}
      </div>
    </BoxContent>
  );
});

export const OnlineLayout = redux((state: AppState) => ({
  chatId: state.ui.youtube.chatId,
}))(OnlineLayoutComponent);

const useStyles = makeStyles(theme => ({
  wrap: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '2rem 0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chat: {
    padding: '1rem',
  },
  stream: {
    marginBottom: 'auto',
    paddingTop: '1rem',
    minWidth: 320,
    width: 560,
  },
  m12: {
    marginLeft: '.5rem',
  },
}));
