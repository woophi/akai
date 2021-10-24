import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import { getCookie } from 'core/cookieManager';
import { theme } from 'core/lib';
import { wrapper } from 'core/store';
import { appWithTranslation } from 'next-i18next';
import App from 'next/app';
import * as React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import('core/fire-callbacks');

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const lang = ctx.req
      ? ctx.req.cookies['akai_lng']
      : getCookie('akai_lng') || 'en';
    const curLang = (ctx.req && ctx.req.language);
    const i18n = (ctx.req && ctx.req.i18n);
    if (i18n && i18n.changeLanguage && curLang !== lang) {
      i18n.changeLanguage(lang);
    }

    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};
    return {
      pageProps
    };
  }

  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }
  render() {
    const { Component, pageProps, store } = this.props as any;
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div>
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    );
  }
}
export default wrapper.withRedux(appWithTranslation(MyApp));
