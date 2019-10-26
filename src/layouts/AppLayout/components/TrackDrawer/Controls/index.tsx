import React from 'react'
import {makeStyles, Paper} from '@material-ui/core'
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

const useStyles = makeStyles({
  controls: {
    display: 'flex',
    flexFlow: 'column',
    position: 'relative',
    width: '100%',
    // height: '100px',
    backgroundColor: '#ffffffef',
    zIndex: 1300
  }
})
