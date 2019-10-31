import React from 'react'
import {
  Paper,
  Typography,
  FormControlLabel,
  Switch,
  makeStyles
} from '@material-ui/core'
import {toggleTheme, $theme} from 'stores/Theme'
import {useStore} from 'effector-react'

export const ThemeSettings: React.FC = () => {
  const cls = styles()
  const theme = useStore($theme)

  const onToggleTheme = (): void => {
    toggleTheme()
  }

  const isDark = theme === 'Dark'

  return (
    <Paper className={cls.paper} square>
      <Typography className={cls.title} component="h2" gutterBottom color="secondary">Application theme</Typography>
      <FormControlLabel
        className={cls.formControl}
        control={
          <Switch checked={isDark} onChange={onToggleTheme} value="isDark" />
        }
        labelPlacement="start"
        label="Enable dark theme"
      />
    </Paper>
  )
}

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
