import React from 'react'
import {makeStyles, Paper, Theme} from '@material-ui/core'
import {TrackSlider} from './TrackSlider'
import {TrackTime} from './TrackTime'
import {TrackControls} from './TrackControls'

export const Controls: React.FC = (props) => {
  const c = useStyles()

  return (
    <Paper className={c.controls} square>
      <TrackSlider />
      <TrackTime />
      <TrackControls />
    </Paper>
  )
}

let background = (t: Theme): string =>
  t.palette.type === 'light' ? '#ffffffef' : t.palette.primary.dark

const useStyles = makeStyles((theme: Theme) => ({
  controls: {
    display: 'flex',
    flexFlow: 'column',
    position: 'relative',
    width: '100%',
    // height: '100px',
    backgroundColor: background(theme),
    zIndex: 1300
  }
}))
