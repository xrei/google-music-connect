import React from 'react'
import ReactDOM from 'react-dom'
import {Router} from 'react-router'
import {Route} from 'react-router-dom'
import {StylesProvider, ThemeProvider} from '@material-ui/styles'
import './index.css'
import Routes, {history} from './routes'
import theme from './theme'
import {App} from './App'
import {Setup} from './views/Setup'
import PrivateRoute from './components/PrivateRoute'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <StylesProvider injectFirst>
    <ThemeProvider theme={theme}>
      <Router history={history}>
        <Route path={Routes.setup.path} component={Setup}/>
        <PrivateRoute
          path={Routes.root.path}
          redirect={Routes.setup.path}
          component={App}
        />
      </Router>
    </ThemeProvider>
  </StylesProvider>
  ,
  document.getElementById('root')
)

serviceWorker.register()
