import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import * as React from 'react';
import { useTranslation } from 'server/lib/i18n';
import { BoxContent, H1 } from 'ui/atoms';

type Props = {
  photoUrl: string;
  content: string;
};
export const AboutLayout: React.FC<Props> = React.memo(({ content = '', photoUrl = '' }) => {
  const isSmallEnough = useMediaQuery('(max-width:800px)');
  const classes = useStyles({ isSmallEnough });
  const { t } = useTranslation();
  return (
    <BoxContent>
      <H1 upperCase>{t('common:about.title')}</H1>
      <div className={classes.wrap}>
        <div className={classes.wrapChild}>
          <img className={classes.img} alt="akai" src={photoUrl} />
        </div>
        <div className={classes.wrapChildText}>
          <Typography variant="button" display="block" gutterBottom>
            {t('common:about.subTitle')}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <div className="quill ">
              <div className="ql-snow">
                <div className="ql-editor no-padding" dangerouslySetInnerHTML={{ __html: content }} />
              </div>
            </div>
          </Typography>
        </div>
      </div>
    </BoxContent>
  );
});

type StyleProps = {
  isSmallEnough: boolean;
};

const useStyles = makeStyles<Theme, StyleProps>(theme => ({
  wrap: props => ({
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: props.isSmallEnough ? 'unset' : '3rem',
  }),
  wrapChild: props => ({
    width: 'auto',
    margin: props.isSmallEnough ? '0 auto 1rem' : '0 1rem 1rem auto',
    position: 'relative',
  }),
  wrapChildText: props => ({
    minWidth: '320px',
    maxWidth: props.isSmallEnough ? '320px' : '500px',
    margin: props.isSmallEnough ? '.5rem auto 1rem' : '.5rem auto 1rem 1rem',
    padding: '0 1rem 1rem',
  }),
  footer: {
    marginTop: 'auto',
  },
  img: props => ({
    boxShadow: '-4px 10px 7px -10px rgba(0,0,0,0.75)',
    height: '350px',
    width: '320px',
    visibility: 'visible',
    opacity: 1,
    transition: '.2s ease-in-out',
    objectFit: 'cover',
  }),
}));
