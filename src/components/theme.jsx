import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#ffeb3b',
    },
    secondary: {
      main: '#d81b60',
    },
  },
  typography: {
    fontFamily: ['Roboto', 'Montserrat', 'sans-serif'].join(','),
  },
});

export default theme;
