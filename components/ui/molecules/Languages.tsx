import { MenuItem, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getCookie, setCookie } from 'core/cookieManager';
import { LocaleId } from 'core/models';
import Router from 'next/router';
import * as React from 'react';
import { useTranslation } from 'server/lib/i18n';

const changeLanguage = (lang: LocaleId, i18n: any) => {
  const cookieLang = getCookie('akai_lng');
  if (cookieLang && cookieLang !== lang) {
    setCookie('akai_lng', lang, 10);
    i18n.changeLanguage(lang, () => {
      if (Router.pathname.indexOf('gallery') !== -1 || Router.pathname.indexOf('about') !== -1) {
        window.location.reload();
      }
    });
  }
};

export const Languages = React.memo(() => {
  const classes = useStyles();
  const { i18n } = useTranslation();
  return (
    <div className={classes.content}>
      <img onClick={() => changeLanguage(LocaleId.En, i18n)} className={classes.img} src="/img/en.png" alt="language_en" />
      <img onClick={() => changeLanguage(LocaleId.Ru, i18n)} className={classes.img} src="/img/ru.png" alt="language_ru" />
      <img onClick={() => changeLanguage(LocaleId.Cs, i18n)} className={classes.img} src="/img/cz.png" alt="language_cz" />
    </div>
  );
});

export const SelectLanguage = React.memo(() => {
  const classes = useStyles();
  const { i18n } = useTranslation();

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    changeLanguage(event.target.value as LocaleId, i18n);
  };
  return (
    <Select autoWidth value={i18n.language} onChange={handleChange} className={classes.langControl}>
      <MenuItem value={LocaleId.En}>EN</MenuItem>
      <MenuItem value={LocaleId.Ru}>РУ</MenuItem>
      <MenuItem value={LocaleId.Cs}>ČS</MenuItem>
    </Select>
  );
});

const useStyles = makeStyles(theme => ({
  content: {
    display: 'flex',
    alignItems: 'center',
  },
  img: {
    marginRight: '16px',
    cursor: 'pointer',
    width: '30px',
    height: '30px',
  },
  langControl: {
    '&>svg': {
      display: 'none',
    },
    '&>div': {
      paddingRight: '12px !important',
      paddingLeft: '12px',
    },
    '&:before': {
      content: '""',
      borderBottom: 'none',
    },
    fontSize: '0.875rem;',
    fontWeight: 500,
  },
}));
