import React from 'react'
import {useStore} from 'effector-react'
import {Route, RouteComponentProps} from 'react-router-dom'
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import Routes from './routes'
import {Home} from './views'
import {AppLayout} from './layouts/AppLayout'
import RouteType from './types/Route'
import {appReady} from './models/main'
import themeOpts from './theme'
import {$theme} from 'stores/Theme'

const appRoutes: RouteType[] = Object.values(Routes.app)

export const App: React.FC<RouteComponentProps> = ({location}) => {
  const themeVariant = useStore($theme)
  React.useEffect(() => {
    appReady()
  }, [])

  const theme = createMuiTheme(themeOpts[themeVariant])

  return (
    <ThemeProvider theme={theme}>
      <AppLayout title={makeTitle(appRoutes, location.pathname)}>
        <Route path={Routes.root.path} exact component={Home} />
        {
          appRoutes.map(({path, view}, i) => (
            <Route key={i} path={path} component={view} />
          ))
        }
      </AppLayout>
    </ThemeProvider>
  )
}

function makeTitle(xs: RouteType[], p: string): string {
  let found = xs.find(v => v.path === p)
  if (found && found.title) return found.title
  else return Routes.root.title
}
