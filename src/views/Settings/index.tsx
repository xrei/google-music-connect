import React from 'react'
import {Grid} from '@material-ui/core'
import {ThemeSettings} from './components/ThemeSettings'

export const Settings: React.FC = () => {
  return (
    <Grid container
      spacing={1}
    >
      <Grid item xs={12} md={6}>
        <ThemeSettings key="1" />
      </Grid>
      <Grid item xs={12}>
        huy
      </Grid>
    </Grid>
  )
}
