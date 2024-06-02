import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#512da8',  // Darker purple color for buttons
    },
    secondary: {
      main: '#d32f2f',  // Main red color
    },
    complementary: {
      main: '#fbc02d',  // Complementary yellow color
    },
    background: {
      default: '#e0f7fa',  // Light cyan background
    },
    contactBlock: {
      main: 'rgba(189, 189, 189, 0.5)',  // Transparent grey background for contact blocks
    },
    contactText: {
      main: '#ffffff',  // White color for contact name+surname and number
    },
  },
  typography: {
    fontWeightBold: 700,  // Bold font weight
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
          borderRadius: 4,
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#333',
              borderWidth: 2,
            },
            '&:hover fieldset': {
              borderColor: '#111',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#000',  // Black border for active (focused) field
              borderWidth: 2,  // Thicker border for focused state
            },
          },
          '& .MuiInputLabel-root': {
            fontWeight: 700,  // Thicker font for label text
            color: '#000',  // Black color for label text
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderColor: '#333',
          borderWidth: 2,
          borderStyle: 'solid',
          backgroundColor: 'rgba(189, 189, 189, 0.5)',  // Transparent grey background for contact blocks
          color: '#81d4fa',  // Light light blue color for text (general)
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#512da8',  // Darker purple color
          color: '#fff',
          '&:hover': {
            backgroundColor: '#311b92',  // Even darker purple on hover
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#ffffff',  // Light light blue color for edit and delete buttons
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          color: '#ffffff',  // White color for primary text (name+surname)
        },
        secondary: {
          color: '#ffffff',  // White color for secondary text (phone number)
        },
      },
    },
  },
});

export default theme;
