import React from 'react'
import {InitialView} from './components/InitialView'
import styled from 'styled-components'

export const Home: React.FC = () => {
  return (
    <HomeWrapper>
      <InitialView></InitialView>
    </HomeWrapper>
  )
}

const HomeWrapper = styled.div`
  display: flex;
  height: 100%;
`