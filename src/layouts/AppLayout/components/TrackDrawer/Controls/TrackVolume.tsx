import React, {SyntheticEvent} from 'react'
import {Slider, IconButton, Popover, makeStyles} from '@material-ui/core'
import {VolumeUp as VolumeIcon} from '@material-ui/icons'
import {useStore} from 'effector-react'

export const TrackVolume: React.FC = () => {
  const c = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const [tempVol, setVol] = React.useState(5)

  
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const trackVolChange = (e: React.ChangeEvent, nv: number | number[]): void => {
    (e.stopPropagation())
    setVol(nv as number)
  }
  const trackVolChangeEnd = (e: unknown, nv: number | number[]): void => {
    // api.sendPlaybackTime(nv as number)
  }

  return (
    <>
      <IconButton aria-label="volume" aria-describedby={id}
        onClick={e => setAnchorEl(e.currentTarget)}
      >
        <VolumeIcon className={c.subIcon} />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <div className={c.volContainer}>
          <Slider
            orientation="vertical"
            min={0}
            max={100}
            step={5}
            value={tempVol}
            onChange={trackVolChange as any}
            onChangeCommitted={trackVolChangeEnd}
          />
        </div>
      </Popover>
    </>
  )
}

const useStyles = makeStyles({
  subIcon: {
    height: 28,
    width: 28
  },
  volContainer: {
    padding: 12,
    height: 100
  }
})