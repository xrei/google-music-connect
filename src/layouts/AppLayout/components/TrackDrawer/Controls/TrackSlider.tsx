import React from 'react'
import {withStyles, Slider} from '@material-ui/core'
import {useStore} from 'effector-react'
import {$trackTime} from 'stores/Track/trackTime'
import {api} from 'api'

export const TrackSlider: React.FC = () => {
  const time = useStore($trackTime)
  const [touched, setTouch] = React.useState(false)
  const [tempTime, setTime] = React.useState(0)

  const trackTimeChange = (e: any, nv: number | number[]): void => {
    setTouch(true)
    setTime(nv as number)
  }
  const trackTimeChangeEnd = (e: any, nv: number | number[]): void => {
    setTouch(false)
    api.sendPlaybackTime(nv as number)
  }

  let trackCurrTime = touched ? tempTime : time.current
  return (
    <TrackSliderStyled
      min={0}
      max={time.total}
      value={trackCurrTime}
      onChange={trackTimeChange}
      onChangeCommitted={trackTimeChangeEnd}
      aria-labelledby="track-slider"
      color="secondary"
    />
  )
}

const TrackSliderStyled = withStyles({
  root: {
    height: 4,
    padding: 0,
    position: 'absolute'
  },
  track: {
    height: 4
  },
  rail: {
    height: 4
  },
  thumb: {
    width: 18,
    height: 18,
    marginTop: -7,
    marginLeft: -9
  }
})(Slider)
