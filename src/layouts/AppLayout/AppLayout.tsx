import React from 'react'
import styled from 'styled-components'
import {Container, CssBaseline} from '@material-ui/core'
import {AppBar} from './components/AppBar'
import {SideMenu} from './components/SideMenu'
import {AuthCodeDialog} from '../../components/AuthCodeDialog'
import {sendConnect} from 'api'

type Props = {
  children: React.ReactNode,
  title: string,
  bottomPanel?: React.ReactNode,
}

export const AppLayout: React.FC<Props> = ({children, title, bottomPanel}) => {
  return (
    <Layout>
      <CssBaseline />
      <AppBar title={title}/>
      <SideMenu />
      <Content>
        <ContentWrap maxWidth="md">
          {children}
        </ContentWrap>
      </Content>
      {
        bottomPanel && <BottomPanel>
          {bottomPanel}
        </BottomPanel>
      }
      <AuthCodeDialog onSaveClick={(code) => sendConnect(['_', code])} />
    </Layout>
  )
}

const Layout = styled.div`
  display: flex;
  position: relative;
`
const Content = styled.main`
  display: flex;
  flex-grow: 1;
  height: 100vh;
`
const ContentWrap = styled(Container)`
  margin-top: 64px;
  padding: 0;
  @media (max-width: 600px) {
    margin-top: 60px;
  }
`

const BottomPanel = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%
`
