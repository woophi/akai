import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { H1, SocialButtons, Spinner } from 'ui/atoms';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'server/lib/i18n';

type Props = {
  photoUrl: string;
  content: string;
}
export const AboutLayout: React.FC<Props> = React.memo(({
  content = '',
  photoUrl = ''
}) => {
  const isSmallEnough = useMediaQuery('(max-width:800px)');
  const [loading, setLoad] = React.useState(true);
  const classes = useStyles({ isSmallEnough, loading });
  const { t } = useTranslation();
  return (
    <div className={classes.content}>
      <H1 upperCase>{t('common:about.title')}</H1>
      <div className={classes.wrap}>
        <div className={classes.wrapChild}>
          <SocialButtons />
          <Spinner isShow={loading} />
          <img
            className={classes.img}
            alt="akai"
            src={photoUrl}
            onLoad={() => setLoad(false)}
          />
        </div>
        <div className={classes.wrapChildText}>
          {content && (
            <>
              <Typography variant="button" display="block" gutterBottom>
                {t('common:about.title')}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {content}
              </Typography>
            </>
          )}
        </div>
      </div>
    </div>
  );
});

type StyleProps = {
  isSmallEnough: boolean;
  loading: boolean
};

const useStyles = makeStyles<Theme, StyleProps>(theme => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  wrap: props => ({
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: props.isSmallEnough ? 'unset' : '3rem'
  }),
  wrapChild: props => ({
    width: 'auto',
    margin: props.isSmallEnough ? '0 auto 1rem' : '0 1rem 1rem auto',
    position: 'relative'
  }),
  wrapChildText: props => ({
    minWidth: '320px',
    maxWidth: props.isSmallEnough ? '320px' : '500px',
    margin: props.isSmallEnough ? '0 auto 1rem' : '0 auto 1rem 1rem',
    padding: '0 1rem 1rem'
  }),
  footer: {
    marginTop: 'auto'
  },
  img: props => ({
    boxShadow: '-4px 10px 7px -10px rgba(0,0,0,0.75)',
    height: '350px',
    width: '320px',
    visibility: props.loading ? 'hidden' : 'visible',
    opacity: props.loading ? 0 : 1,
    transition: '.2s ease-in-out'
  })
}));
