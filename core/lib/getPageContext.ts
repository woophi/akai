import { SheetsRegistry } from 'jss';
import { createMuiTheme, createGenerateClassName } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
  palette: {
    primary: {
      light: purple[300],
      main: purple[500],
      dark: purple[700],
    },
    secondary: {
      light: green[300],
      main: green[500],
      dark: green[700],
    },
  },
  typography: {
    useNextVariants: true,
  },
});

const createPageContext = () => ({
  theme,
  // This is needed in order to deduplicate the injection of CSS in the page.
  sheetsManager: new Map(),
  // This is needed in order to inject the critical CSS.
  sheetsRegistry: new SheetsRegistry(),
  // The standard class name generator.
  generateClassName: createGenerateClassName(),
});

type INodeProcess = {
  browser: boolean;
} & NodeJS.Process;
type INodeGlobal = {
  __INIT_MATERIAL_UI__: any;
} & NodeJS.Global;

export const getPageContext = () => {
  // Make sure to create a new context for every server-side request so that data
  // isn't shared between connections (which would be bad).
  if (!(process as INodeProcess).browser) {
    return createPageContext();
  }

  const Iglobal = global as INodeGlobal;
  // Reuse context on the client-side.
  if (!Iglobal.__INIT_MATERIAL_UI__) {
    Iglobal.__INIT_MATERIAL_UI__ = createPageContext();
  }

  return Iglobal.__INIT_MATERIAL_UI__;
}
