import React from 'react'
import styled from 'styled-components'
import {
  Paper,
  Typography,
  FormControlLabel,
  Switch,
  makeStyles
} from '@material-ui/core'

const styles = makeStyles({
  formControl: {
    justifyContent: 'space-between',
    width: '100%',
    margin: 0
  },
  paper: {
    padding: '16px'
  },
  title: {
    fontWeight: 500
  }
})

export const ThemeSettings: React.FC = () => {
  const cls = styles()
  const [isDark, setTheme] = React.useState(false)

  return (
    <Paper className={cls.paper} square>
      <Typography className={cls.title} component="h2" gutterBottom color="secondary">Application theme</Typography>
      <FormControlLabel
        className={cls.formControl}
        control={
          <Switch checked={isDark} onChange={() => setTheme(!isDark)} value="isDark" />
        }
        labelPlacement="start"
        label="Enable dark theme"
      />
    </Paper>
  )
}
