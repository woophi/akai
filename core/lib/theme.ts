import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';

// Create a theme instance.
export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#cabcab',
      light: '#edebe8'
    },
    secondary: {
      main: grey[900],
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff'
    },
    text: {
      secondary: '#fff'
    }
  },
});
