import React from 'react'
import {Container, CssBaseline, makeStyles} from '@material-ui/core'
import {AppBar} from './components/AppBar'
import {SideMenu} from './components/SideMenu'
import {AuthCodeDialog} from '../../components/AuthCodeDialog'
import {sendConnect} from 'api'
import {TrackPanel} from 'components/TrackPanel'

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
      </div>
      <AuthCodeDialog onSaveClick={(code) => sendConnect(['_', code])} />
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
    height: '100vh'
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
