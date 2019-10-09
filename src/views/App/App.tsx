import React, { useEffect } from 'react'
import styled from 'styled-components'
import {AppBar} from './components/AppBar'
import {SideMenu} from './components/SideMenu'
// import { socket } from '../api'

const Layout = styled.main`
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: #fffdf2;
  color: #fff;
`

export const App: React.FC = () => {
  useEffect(() => {
    // socket.send(JSON.stringify('connect'))
  }, [])
  return (
    <Layout>
      <AppBar/>
      <SideMenu />
    </Layout>
  )
}
