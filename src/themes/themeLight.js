import { createTheme } from '@mui/material/styles';

const themeOptions = 
{
    palette: {
        type: 'light',
        mode: 'light',
        primary: {
          main: '#216869',
        },
        secondary: {
          main: '#9cc5a1',
        },
        error: {
          main: '#f44336',
      },
    },
  };

  const theme = createTheme(themeOptions);
  
  export default theme