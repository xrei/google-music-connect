import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {StylesProvider, ThemeProvider} from '@material-ui/styles'
import './index.css'
import theme from './theme'
import {App} from './App'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <StylesProvider injectFirst>
    <ThemeProvider theme={theme}>
      <Router>
        <Route path='/' component={App}/>
      </Router>
    </ThemeProvider>
  </StylesProvider>
  ,
  document.getElementById('root')
)

serviceWorker.register()
