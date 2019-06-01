import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';

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

export const Languages: React.FC = React.memo(() => {
  const classes = useStyles();
  return (
    <div className={classes.content}>
      <img className={classes.img} src="/static/img/en.png" alt="language_en" />
      <img className={classes.img} src="/static/img/ru.png" alt="language_ru" />
      <img className={classes.img} src="/static/img/cz.png" alt="language_cz" />
    </div>
  );
});
