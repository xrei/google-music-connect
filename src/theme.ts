
import {createMuiTheme} from "@material-ui/core/styles"
import indigo from "@material-ui/core/colors/indigo"
import pink from "@material-ui/core/colors/pink"
import red from "@material-ui/core/colors/red"

export default createMuiTheme({
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
})
