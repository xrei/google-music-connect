import React from 'react'
import styled from 'styled-components'
import {AppBar} from './components/AppBar'
import {SideMenu} from './components/SideMenu'

export const AppLayout: React.FC = ({children}) => {

  return (
    <Layout>
      <AppBar/>
      <SideMenu />
      <Content>
        {children}
      </Content>
    </Layout>
  )
}

const Layout = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  height: 100vh;
  background-color: #fffdf2;
  color: #212121;
`
const Content = styled.main`
  flex-grow: 1;
`
