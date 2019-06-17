import {Provider} from 'react-redux'
import App, {Container} from 'next/app'
import withRedux from 'next-redux-wrapper'
import { initStore } from 'core/store';
import * as React from 'react';
import { appWithTranslation } from 'server/lib/i18n';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { theme } from 'core/lib';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

class MyApp extends App {
  static async getInitialProps({Component, ctx}) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
    // TODO: set language from cookie
    // TODO: add cz translations
    return {
      pageProps
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
    const { Component, pageProps, store } = this.props as any;
    return (
      <Container>
        <ThemeProvider
          theme={theme}
        >
          <CssBaseline />
          <Provider store={store}>
            <div>
              <Component {...pageProps} />
            </div>
          </Provider>
        </ThemeProvider>
      </Container>
    );
  }
}
export default withRedux(initStore)(appWithTranslation(MyApp))
