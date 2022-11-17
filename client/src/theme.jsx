import { createTheme } from '@mui/material/styles'

export default function getTheme(isRTL) {
  return createTheme({
    direction: isRTL ? 'rtl' : 'ltr',
    palette: {
      primary: {
        main: '#43a047',
      },
      secondary: {
        main: '#E36B16',
      },
    },
  })
}

// #9999CC
// #626342
// #0090FF
// #E36B16
