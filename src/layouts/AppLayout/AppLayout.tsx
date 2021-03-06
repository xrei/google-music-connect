import React from 'react'
import {Container, CssBaseline, makeStyles} from '@material-ui/core'
import {AppBar} from './components/AppBar'
import {SideMenu} from './components/SideMenu'
import {TrackDrawer} from './components/TrackDrawer/index'
import {TrackPanel} from './components/TrackPanel'
import {AuthCodeDialog} from '../../components/AuthCodeDialog'
import {api} from 'api'

type Props = {
  children: React.ReactNode,
  title: string,
}

export const AppLayout: React.FC<Props> = ({children, title}) => {
  const c = useStyles()
  return (
    <div className={c.Layout}>
      <CssBaseline />
      <AppBar title={title}/>
      <SideMenu />
      <main className={c.Content}>
        <Container className={c.ContentWrap} maxWidth="md">
          {children}
        </Container>
      </main>
      <div className={c.BottomPanel}>
        <TrackPanel />
        <TrackDrawer />
      </div>
      <AuthCodeDialog onSaveClick={(code) => api.sendConnect(['_', code])} />
    </div>
  )
}

const useStyles = makeStyles({
  Layout: {
    display: 'flex',
    position: 'relative'
  },
  Content: {
    display: 'flex',
    flexGrow: 1,
    minHeight: '100vh'
  },
  ContentWrap: {
    marginTop: 64,
    padding: 0,
    ['@media (max-width: 600px)']: {// eslint-disable-line no-useless-computed-key
      marginTop: 56
    }
  },
  BottomPanel: {
    position: 'fixed',
    bottom: 0,
    width: '100%'
  }
})
