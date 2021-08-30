import { createTheme } from '@material-ui/core/styles';
import { deepPurple, red, indigo } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#664690',
    },
    secondary: {
      main: indigo[500],
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;