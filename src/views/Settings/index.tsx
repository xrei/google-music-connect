import React from 'react'
import {makeStyles} from '@material-ui/styles'
import {Grid} from '@material-ui/core'
import {ThemeSettings} from './components/ThemeSettings'

export const Settings: React.FC = () => {
  return (
    <Grid container
      spacing={1}
    >
      <Grid item xs={12}>
        <ThemeSettings key="1" />
      </Grid>
      <Grid item xs={12}>
        huy
      </Grid>
    </Grid>
  )
}
