import React from 'react'
import {Route} from 'react-router-dom'
import Routes from './routes'
import {Home} from './views'
import {AppLayout} from './layouts/AppLayout'

const appRoutes = Object.values(Routes.app)


export const App: React.FC = () => {
  return (
    <AppLayout>
      <Route path={Routes.root.path} exact component={Home} />
      {
        appRoutes.map(({path, view}) => (
          <Route  path={path} component={view} />
        ))
      }
    </AppLayout>
  )
}