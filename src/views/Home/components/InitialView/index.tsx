import React from 'react'
import styled from 'styled-components'
import {Typography, Button} from '@material-ui/core'

export const InitialView: React.FC = () => {
  return (
    <Container>
      <Title variant="h3" component="h1">Welcome</Title>
      <SubTitle>
        It seems you don't have any connected devices. Please connect to such device in first place to use app.
      </SubTitle>
      <Button variant="contained" color="secondary">Setup new device</Button>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-flow: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  width: 100%;
`

const Title = styled(Typography)`
  margin-bottom: 2rem;
  font-weight: normal;
`

const SubTitle = styled(Typography)`
  margin-bottom: 48px;
`