import React from 'react'
import {Route, RouteComponentProps} from 'react-router-dom'
import Routes from './routes'
import {Home} from './views'
import {AppLayout} from './layouts/AppLayout'
import RouteType from './types/Route'
import {appReady} from './models/main'
import {TrackPanel} from 'components/TrackPanel'

const appRoutes: RouteType[] = Object.values(Routes.app)

export const App: React.FC<RouteComponentProps> = ({location}) => {
  React.useEffect(() => {
    appReady()
  })
  return (
    <AppLayout title={makeTitle(appRoutes, location.pathname)}
      bottomPanel={TrackPanel}
    >
      <Route path={Routes.root.path} exact component={Home} />
      {
        appRoutes.map(({path, view}, i) => (
          <Route key={i} path={path} component={view} />
        ))
      }
    </AppLayout>
  )
}

function makeTitle(xs: RouteType[], p: string): string {
  let found = xs.find(v => v.path === p)
  if (found && found.title) return found.title
  else return Routes.root.title
}
