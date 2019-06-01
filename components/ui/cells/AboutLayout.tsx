import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { H1, SocialButtons } from 'ui/atoms';
import { Footer } from 'ui/molecules';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';

export const AboutLayout: React.FC = React.memo(() => {
  const isSmallEnough = useMediaQuery('(max-width:800px)');
  const classes = useStyles({ isSmallEnough });
  return (
    <div className={classes.content}>
      <H1>ABOUT ME</H1>
      <div className={classes.wrap}>
        <div className={classes.wrapChild}>
          <SocialButtons />
          <img
            className={classes.img}
            alt="akai"
            src={'http://akaiakaev.com/images/foto_BIO.jpg'}
            height="350px"
          />
        </div>
        <div className={classes.wrapChildText}>
          <Typography variant="button" display="block" gutterBottom>
            Биография
          </Typography>
          <Typography variant="body1" gutterBottom>
            1967г.- Родился в г.Буйнакск , Республике Дагестан. 1982-1986г.- Учился в
            Дагестанском художественном училище им. Джемала в г. Махачкале.
            1986-1988г.- Служба в Армии. 1991-1999г.- Работал преподователем в Школе
            Интернате "Пять Сторон Света" в сел.Халимбек аул, Республике Дагестан. С
            1999г. живет и работает в Чешской Республики г.Прага. Выставки 2000г.-
            "Без Страха" графика.- г.Брно,Чешская Республика. 2001г.-"Новые
            ориентиры" живопись графика.- г.Клатови, Чешская Республика.
            2010г.-"Прекрасные потери" живопись, графика.- г.Прага, Чешская
            Республика. 2012.- Презентация Образовательного Проекта "Мир глазами,
            руками детей".- г .Буйнакск , Республика Дагестан, Россия.
          </Typography>
        </div>
      </div>
      <Footer className={classes.footer} />
    </div>
  );
});

type StyleProps = {
  isSmallEnough: boolean;
};

const useStyles = makeStyles<Theme, StyleProps>(theme => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  wrap: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  wrapChild: props => ({
    width: 'auto',
    margin: props.isSmallEnough ? '0 auto 1rem' : '0 1rem 1rem auto'
  }),
  wrapChildText: props => ({
    width: '320px',
    margin: props.isSmallEnough ? '0 auto 1rem' : '0 auto 1rem 1rem',
    padding: '0 1rem 1rem'
  }),
  footer: {
    marginTop: 'auto'
  },
  img: {
    boxShadow: '-4px 10px 7px -10px rgba(0,0,0,0.75)'
  }
}));
