import React from 'react'
import styled from 'styled-components'
import {Theme, Typography, Button, Paper, makeStyles, TextField,
  Dialog, DialogTitle, DialogContent, DialogActions,
  CircularProgress
} from '@material-ui/core'
import {useStore} from 'effector-react'
import {
  $ip, $ipCorrect, $name, $nameCorrect,
  mountFormEvt, unmountFormEvt, submitFormEvt,
  IPChangeEvt, nameChangeEvt, $isSubmitEnabled,
  $modal, hideAuthCodeModal, finishSetup, $isConnecting
} from './model'

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
  },
  btnProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  wrapper: {
    position: 'relative'
  }
}))


export const Setup: React.FC = () => {
  React.useEffect(() => {
    mountFormEvt()
    return unmountFormEvt as unknown as void
  })

  return (
    <Container>
      <Title variant="h3" component="h1" color="primary">Welcome</Title>
      <SubTitle>
        It seems you don't have any connected devices.<br/>Please connect to such device in first place to use app.<br/>Make sure your pc/device has running<br/>
        <a rel="noopener noreferrer" target="_blank"  href="https://github.com/MarshallOfSound/Google-Play-Music-Desktop-Player-UNOFFICIAL-">Google Play Music Desktop</a>
      </SubTitle>
      <NewDeviceForm />
      <AuthCodeModal />
    </Container>
  )
}

const AuthCodeModal: React.FC = () => {
  const [code, setCode] = React.useState('')
  const open = useStore($modal)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCode(event.target.value)
  }

  const disabled = !(code.length === 4)

  return (
    <Dialog
      open={open}
    >
      <DialogTitle>Enter 4-digit auth code</DialogTitle>
      <DialogContent>
        <TextField type="number" required fullWidth 
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={hideAuthCodeModal}>Close</Button>
        <Button disabled={disabled} onClick={() => finishSetup(code)}>Save device</Button>
      </DialogActions>
    </Dialog>
  )
}

const NewDeviceForm: React.FC = () => {
  const cls = useStyles()

  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault()
    submitFormEvt()
  }

  const isSubmitEnabled = useStore($isSubmitEnabled)
  const loading = useStore($isConnecting)

  return (
    <Paper square className={cls.paper}>
      <IpInput className={cls.textField} />
      <NameInput className={cls.textField} />
      <div className={cls.wrapper}>
        <Button
          disabled={!isSubmitEnabled}
          variant="contained" color="secondary"
          onClick={handleSubmit}
        >Setup new device</Button>
        {loading && <CircularProgress className={cls.btnProgress} size={24} />}
      </div>
    </Paper>
  )
}

const IpInput: React.FC<{className: string}> = ({className}) => {
  const ip = useStore($ip)
  const ipErr = !useStore($ipCorrect)
  return (
    <TextField
      className={className}
      id="deviceIp"
      label="IP address"
      placeholder="192.168.0.x"
      value={ip}
      helperText="Device/PC local ip address from your local network"
      required
      onChange={IPChangeEvt}
      error={ipErr}
    />
  )
}
const NameInput: React.FC<{className: string}> = ({className}) => {
  const name = useStore($name)
  const nameErr = !useStore($nameCorrect)
  return (
    <TextField
      className={className}
      fullWidth
      id="deviceName"
      label="Name"
      value={name}
      helperText="Enter name of your device"
      required
      onChange={nameChangeEvt}
      error={nameErr}
    />
  )
}

const Container = styled.div`
  display: flex;
  flex-flow: column;
  text-align: center;
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
