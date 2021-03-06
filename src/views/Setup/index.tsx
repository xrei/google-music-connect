import React from 'react'
import {
  Theme, Typography, Button, Paper, makeStyles, TextField,  CircularProgress
} from '@material-ui/core'
import {useStore} from 'effector-react'
import {
  $ip, $ipCorrect, $name, $nameCorrect,
  pageMounted, pageUnmounted, submitFormEvt,
  IPChangeEvt, nameChangeEvt, $isSubmitEnabled, $isConnecting, finishSetup
} from './model'
import {AuthCodeDialog} from 'components/AuthCodeDialog'

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
  const c = setupStyles()
  React.useEffect(() => {
    pageMounted()
    return pageUnmounted as unknown as void
  })

  const dialogClickSave = (code: string): void => {
    finishSetup(code)
  }

  return (
    <div className={c.Container}>
      <Typography className={c.Title} variant="h3" component="h1" color="primary">Welcome</Typography>
      <Typography className={c.subTitle}>
        It seems you don't have any connected devices.<br/>Please connect to such device in first place to use app.<br/>Make sure your pc/device has running<br/>
        <a rel="noopener noreferrer" target="_blank"  href="https://github.com/MarshallOfSound/Google-Play-Music-Desktop-Player-UNOFFICIAL-">Google Play Music Desktop</a>
      </Typography>
      <NewDeviceForm />
      <AuthCodeDialog onSaveClick={dialogClickSave}/>
    </div>
  )
}



const NewDeviceForm: React.FC = () => {
  const cls = useStyles()

  const handleSubmit = (e: React.SyntheticEvent): void => {
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

const setupStyles = makeStyles({
  Container: {
    display: 'flex',
    flexFlow: 'column',
    textAlign: 'center',
    maxWidth: '768px',
    padding: '8px',
    margin: '32px auto'
  },
  Title: {
    marginBottom: '2rem',
    fontWeight: 'normal'
  },
  subTitle: {
    marginBottom: '48px'
  }
})
