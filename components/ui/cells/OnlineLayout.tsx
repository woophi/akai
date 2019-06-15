import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { H1, SocialButtons } from 'ui/atoms';
import getConfig from 'next/config';
import Typography from '@material-ui/core/Typography';

const { publicRuntimeConfig } = getConfig();
const { CHANNEL_ID, CHAT_VIDEO_ID, CHAT_DOMAIN } = publicRuntimeConfig;

export const OnlineLayout: React.FC = React.memo(() => {
  const classes = useStyles({});

  return (
    <div className={classes.content}>
      <H1>Online stream</H1>
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
            ONLINE ATELIER
          </Typography>
          <Typography
            variant="h5"
            display="block"
            gutterBottom
            className={classes.m12}
          >
            Akai Akaev
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
