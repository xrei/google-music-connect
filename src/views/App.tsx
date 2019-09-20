import React from 'react'
import styled from 'styled-components'

const Layout = styled.main`
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: #212121;
  color: #fff;
`

const App: React.FC = () => (
  <Layout />
)

export default App