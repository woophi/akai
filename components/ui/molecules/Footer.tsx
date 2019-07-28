import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { SocialButtons } from 'ui/atoms';
import { useTranslation } from 'server/lib/i18n';

const useStyles = makeStyles(theme => ({
  footer: {
    padding: '7rem 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.palette.secondary.light
  }
}));

type Props = {
  className?: string;
};

export const Footer: React.FC<Props> = React.memo(({ className = '' }) => {
  const classes = useStyles({});
  const { t } = useTranslation();
  return (
    <footer className={`${classes.footer} ${className}`}>
      <Typography variant="subtitle2" gutterBottom>
        © {t('common:AA')} {new Date().getFullYear()} {t('common:footer.rights')}.
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {t('common:footer.developed')}{' '}
        <Link
          component="a"
          variant="body2"
          href="http://km-webstudio.xyz/contact.html"
          target="_blank"
        >
          {t('common:footer.KM')}
        </Link>
      </Typography>
      <SocialButtons />
    </footer>
  );
});
