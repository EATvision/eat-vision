import { createTheme } from '@mui/material/styles'

export default function getTheme(isRTL) {
  return createTheme({
    typography: {
      allVariants: {
        fontFamily: '"Rubik", "Helvetica", "Arial", sans-serif',
      },
    },
    direction: isRTL ? 'rtl' : 'ltr',
    palette: {
      primary: {
        main: '#568EA3',
      },
      secondary: {
        main: '#A7B0CA',
      },
    },
  })
}

// #9999CC
// #626342
// #0090FF
// #E36B16
