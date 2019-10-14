import React from 'react'
import styled from 'styled-components'
import {Theme, Typography, Button, Paper, makeStyles, TextField,
  Dialog, DialogTitle, DialogContent, DialogActions
} from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    flexFlow: 'column',
  },
  textField: {
    marginBottom: 16
  },
  btn: {
    marginTop: 32
  }
}))

type State = {
  ip: string,
  name: string,
}

export const Setup: React.FC = () => {
  const cls = useStyles()
  
  const [data, setData] = React.useState<State>({
    ip: '',
    name: ''
  })
  const [open, setOpen] = React.useState(false)

  const handleSubmitButton = (): void => {
    setOpen(true)
  }

  const handleClose = (): void => {
    setOpen(false)
  }

  const handleChange = (name: keyof State) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setData({...data, [name]: e.target.value})
  }

  return (
    <Container>
      <Title variant="h3" component="h1">Welcome</Title>
      <SubTitle>
        It seems you don't have any connected devices. Please connect to such device in first place to use app.
      </SubTitle>
      <Paper square className={cls.paper}>
        <TextField
          className={cls.textField}
          id="deviceIp"
          label="IP address"
          placeholder="192.168.0.0"
          value={data.ip}
          helperText="Device/PC local ip address from your local network"
          required
          onChange={handleChange('ip')}
        />
        <TextField
          className={cls.textField}
          fullWidth
          id="deviceName"
          label="Name"
          value={data.name}
          helperText="Enter name of your device"
          required
          onChange={handleChange('name')}
        />
        <Button 
          variant="contained" color="secondary"
          onClick={handleSubmitButton}
        >Setup new device</Button>
      </Paper>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Enter 4-digit auth code</DialogTitle>
        <DialogContent>
          <TextField type="number" required fullWidth />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() => {}}>Save device</Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-flow: column;
  text-align: center;
  /* justify-content: center;
  align-items: center; */
  /* height: 100vh; */
  max-width: 768px;
  padding: 8px;
  margin: 32px auto;
`

const Title = styled(Typography)`
  margin-bottom: 2rem;
  font-weight: normal;
`

const SubTitle = styled(Typography)`
  margin-bottom: 48px;
`
