import {Provider} from 'react-redux'
import App, {Container} from 'next/app'
import withRedux from 'next-redux-wrapper'
import { initStore } from 'core/store';
import * as React from 'react';
// const {I18nextProvider}  = require('react-i18next');
// import { getInitialProps as getI18nProps, I18n } from 'server/lib/i18n';
import { appWithTranslation } from 'server/lib/i18n';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { theme } from 'core/lib';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

class MyApp extends App {
  static async getInitialProps({Component, ctx}) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
    // const namespaces = ['common'];

    // let i18nProviderProps = ctx.req ?
    //   getI18nProps(ctx.req, namespaces) :
    //   {i18n: I18n};
    // if (!i18nProviderProps) {
    //   i18nProviderProps = {i18n: I18n}
    // }
    // if (!i18nProviderProps.i18n) {
    //   i18nProviderProps.i18n = I18n;
    // }

    return {
      pageProps,
      // i18nProviderProps
    }
  }

  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
    import('core/socket');
    import('core/fire-callbacks');
  }
  render () {
    const { Component, pageProps, store, /*i18nProviderProps*/ } = this.props as any;
    // if (!i18nProviderProps.i18n) {
    //   i18nProviderProps.i18n = I18n;
    // }
    return (
      <Container>
        <ThemeProvider
          theme={theme}
        >
          <CssBaseline />
          <Provider store={store}>
            {/* <I18nextProvider {...i18nProviderProps}> */}
              <div>
                <Component {...pageProps} />
              </div>
            {/* </I18nextProvider> */}
          </Provider>
        </ThemeProvider>
      </Container>
    );
  }
}
export default withRedux(initStore)(appWithTranslation(MyApp))
