import React from 'react'
import styled from 'styled-components'
import {AppBar} from './components/AppBar'
import {SideMenu} from './components/SideMenu'

type Props = {
  children: React.ReactNode,
  title: string
}

export const AppLayout: React.FC<Props> = ({children, title}) => {
  return (
    <Layout>
      <AppBar title={title}/>
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
