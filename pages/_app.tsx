import {Provider} from 'react-redux'
import App, {Container} from 'next/app'
import withRedux from 'next-redux-wrapper'
import { initStore } from 'core/store';
import * as React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';
import { getPageContext } from 'core/lib';
const {I18nextProvider}  = require('react-i18next');
import { getInitialProps as getI18nProps, I18n } from 'server/lib/i18n';

class MyApp extends App {
  static async getInitialProps({Component, ctx}) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
    const namespaces = ['common'];

    let i18nProviderProps = ctx.req ?
      getI18nProps(ctx.req, namespaces) :
      {i18n: I18n};
    if (!i18nProviderProps) {
      i18nProviderProps = {i18n: I18n}
    }
    if (!i18nProviderProps.i18n) {
      i18nProviderProps.i18n = I18n;
    }

    return {
      pageProps,
      i18nProviderProps
    }
  }
  pageContext = getPageContext();

  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
    import('core/socket');
  }
  render () {
    const { Component, pageProps, store, i18nProviderProps } = this.props as any;
    if (!i18nProviderProps.i18n) {
      i18nProviderProps.i18n = I18n;
    }
    return (
      <Container>
        <JssProvider
          registry={this.pageContext.sheetsRegistry}
          generateClassName={this.pageContext.generateClassName}
        >
          <MuiThemeProvider
            theme={this.pageContext.theme}
            sheetsManager={this.pageContext.sheetsManager}
          >
            <CssBaseline />
            <Provider store={store}>
              <I18nextProvider {...i18nProviderProps}>
                <div>
                  <Component pageContext={this.pageContext} {...pageProps} />
                </div>
              </I18nextProvider>
            </Provider>
          </MuiThemeProvider>
        </JssProvider>
      </Container>
    );
  }
}
export default withRedux(initStore)(MyApp)
