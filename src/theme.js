import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    error: {
      main: red.A400,
    },
  },

  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: '0.8rem', // Tamaño de texto para TableCell
        },
      },
    },
  },

  typography: {
    h1: {
      fontSize: '2rem', // Título de nivel 1
    },
    h2: {
      fontSize: '1.75rem', // Título de nivel 2
    },
    h3: {
      fontSize: '1.5rem', // Título de nivel 3
    },
    h4: {
      fontSize: '1.25rem', // Título de nivel 4
    },
    h5: {
      fontSize: '1rem', // Título de nivel 5
    },
    h6: {
      fontSize: '0.875rem', // Título de nivel 6
    },
    body1: {
      fontSize: '1rem', // Texto principal
    },
    body2: {
      fontSize: '0.875rem', // Texto secundario
    },
    subtitle1: {
      fontSize: '1rem', // Subtítulo principal
    },
    subtitle2: {
      fontSize: '0.875rem', // Subtítulo secundario
    },
    button: {
      fontSize: '0.875rem', // Texto de botones
    },
    caption: {
      fontSize: '0.75rem', // Texto de pie de foto
    },
    overline: {
      fontSize: '0.75rem', // Texto de sobrelínea
    },
  },
});

export default theme;