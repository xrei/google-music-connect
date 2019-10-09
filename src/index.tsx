import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import { StylesProvider, ThemeProvider } from '@material-ui/styles'
import theme from './theme'
import { App } from './views'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <StylesProvider injectFirst>
    <ThemeProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </StylesProvider>
  ,
  document.getElementById('root')
)

serviceWorker.register()
