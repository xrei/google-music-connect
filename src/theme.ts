import indigo from '@material-ui/core/colors/indigo'
import pink from '@material-ui/core/colors/pink'
import red from '@material-ui/core/colors/red'
import grey from '@material-ui/core/colors/grey'
import orange from '@material-ui/core/colors/orange'

const LIGHT = 'Light'
const DARK = 'Dark'

type ThemeOptions = {
  [LIGHT]: {},
  [DARK]: {},
}

const themes: ThemeOptions = {
  [LIGHT]: {
    palette: {
      type: 'light',
      primary: indigo,
      secondary: pink,
      error: red,
      contrastThreshold: 3,
      tonalOffset: 0.2,
      background: {
        default: '#fffdf2'
      }
    }
  },
  [DARK]: {
    palette: {
      type: 'dark',
      primary: {
        light: grey[200],
        main: grey[900],
        dark: grey[800]
      },
      secondary: orange,
      error: red,
      contrastThreshold: 3,
      tonalOffset: 0.2,
    }
  }
}

export default themes
