import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from 'core/lib';
import { store } from 'core/store';
import App from 'next/app';
import Head from 'next/head';
import * as React from 'react';
import { Provider as Redux } from 'react-redux';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { appWithTranslation } from 'server/lib/i18n';
import 'ui/atoms/spinner/spinner.css';
import('core/fire-callbacks');

class MyApp extends App {
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('component ->', error, errorInfo);
  }

  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode?.removeChild(jssStyles);
    }
  }
  render() {
    const { Component, pageProps } = this.props as any;
    return (
      <>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Redux store={store}>
            <div>
              <Head>
                <meta charSet="utf-8" />
                {/* Use minimum-scale=1 to enable GPU rasterization */}
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" />
                {/* PWA primary color */}
                <meta name="theme-color" content="#353535" />
              </Head>
              <Component {...pageProps} />
            </div>
          </Redux>
        </ThemeProvider>
      </>
    );
  }
}
export default appWithTranslation(MyApp);
