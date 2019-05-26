import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

// Create a theme instance.
export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6',
      light: '#edebe8'
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff'
    }
  },
});
