import React from 'react'
import ReactDOM from 'react-dom'
import {Router} from 'react-router'
import {Route} from 'react-router-dom'
import {StylesProvider} from '@material-ui/styles'
import './index.css'
import Routes, {history} from './routes'
import {App} from './App'
import {Setup} from './views/Setup'
import PrivateRoute from './components/PrivateRoute'
import * as serviceWorker from './serviceWorker'

import './init'

ReactDOM.render(
  <StylesProvider injectFirst>
    <Router history={history}>
      <Route exact path={Routes.setup.path} component={Setup}/>
      <PrivateRoute
        path={Routes.root.path}
        redirect={Routes.setup.path}
        component={App}
      />
    </Router>
  </StylesProvider>
  ,
  document.getElementById('root')
)

serviceWorker.register()
