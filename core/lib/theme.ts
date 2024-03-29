import { createTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';

// Create a theme instance.
export const theme = createTheme({
  palette: {
    primary: {
      main: '#cabcab',
      light: '#edebe8',
      '100': '#43a047',
    },
    secondary: {
      main: grey[900],
      light: '#efefef',
    },
    error: {
      main: red.A200,
    },
    background: {
      default: '#fff',
    },
  },
});
