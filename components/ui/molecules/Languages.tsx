import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'server/lib/i18n';

export const Languages: React.FC = React.memo(() => {
  const classes = useStyles({});
  const { i18n } = useTranslation();
  return (
    <div className={classes.content}>
      <img
        onClick={() => i18n.changeLanguage('en')}
        className={classes.img}
        src="/static/img/en.png"
        alt="language_en"
      />
      <img
        onClick={() => i18n.changeLanguage('ru')}
        className={classes.img}
        src="/static/img/ru.png"
        alt="language_ru"
      />
      <img
        onClick={() => i18n.changeLanguage('cz')}
        className={classes.img}
        src="/static/img/cz.png"
        alt="language_cz"
      />
    </div>
  );
});

const useStyles = makeStyles(theme => ({
  content: {
    display: 'flex',
    alignItems: 'center'
  },
  img: {
    marginRight: '16px',
    cursor: 'pointer',
    width: '30px',
    height: '30px'
  }
}));
