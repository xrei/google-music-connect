import React from 'react'
import styled from 'styled-components'
import {Container, CssBaseline} from '@material-ui/core'
import {AppBar} from './components/AppBar'
import {SideMenu} from './components/SideMenu'

type Props = {
  children: React.ReactNode,
  title: string,
}

export const AppLayout: React.FC<Props> = ({children, title}) => {
  return (
    <Layout>
      <CssBaseline />
      <AppBar title={title}/>
      <SideMenu />
      <Content>
        <ContentWrap fixed>
          {children}
        </ContentWrap>
      </Content>
    </Layout>
  )
}

const Layout = styled.div`
  display: flex;
`
const Content = styled.main`
  display: flex;
  flex-grow: 1;
  height: 100vh;
`
const ContentWrap = styled(Container)`
  margin-top: 60px;
  padding-top: 1rem;
  padding-bottom: 1rem;
`
