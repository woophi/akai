import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'server/lib/i18n';
import { LocaleIds } from 'core/models';
import { setCookie, getCookie } from 'core/cookieManager';
import Router from 'next/router'

const changeLanguage = (lang: LocaleIds, i18n: any) => {
  const cookieLang = getCookie('akai_lng');
  if (cookieLang && cookieLang !== lang) {
    setCookie('akai_lng', lang, 10);
    i18n.changeLanguage(lang, () => {
      if (
        Router.pathname.indexOf('gallery') !== -1 ||
        Router.pathname.indexOf('about') !== -1
      ) {
        window.location.reload();
      }
    });
  }
}

export const Languages: React.FC = React.memo(() => {
  const classes = useStyles({});
  const { i18n } = useTranslation();
  return (
    <div className={classes.content}>
      <img
        onClick={() => changeLanguage('en', i18n)}
        className={classes.img}
        src="/static/img/en.png"
        alt="language_en"
      />
      <img
        onClick={() => changeLanguage('ru', i18n)}
        className={classes.img}
        src="/static/img/ru.png"
        alt="language_ru"
      />
      <img
        onClick={() => changeLanguage('cs', i18n)}
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
