import React from 'react'
import {makeStyles, Typography} from '@material-ui/core'
import {TrackImg} from './TrackImg'
import {TrackMenu, MenuItem} from './TrackMenu'
import {ExtTrack} from 'api/types'

type Props = {
  track: ExtTrack,
  isPlaying?: boolean,
  menuItems: MenuItem[],
  onClick?: (track: ExtTrack) => void,
}

export const Track: React.FC<Props> = (props) => {
  const {track, menuItems, onClick} = props
  const c = useStyles(props)

  const handleClick = (track: ExtTrack): void => {
    onClick && onClick(track)
  }

  return (
    <div className={c.root} onClick={() => handleClick(track)}>
      <TrackImg className={c.cover} image={track.albumArt} />
      <div className={c.trackInfo}>
        <Typography  className={c.trackTitle} variant="body1">{track.title}</Typography>
        <div className={c.trackInfoInner}>
          <Typography>{track.artist}</Typography>
          <span className={c.separator}></span>
          <Typography variant="subtitle1">{formatTime(track.duration)}</Typography>
        </div>
      </div>
      <TrackMenu
        menuItems={menuItems}
        track={track}
      />
    </div>
  )
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    padding: 8,
    width: '100%',
    height: 72,
  },
  cover: {
    width: 56,
    marginRight: 12
  },
  trackInfo: {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    flex: 1
  },
  trackInfoInner: {
    display: 'flex',
    alignItems: 'center'
  },
  trackTitle: (props: Props) => ({
    fontWeight: props.isPlaying ? 'bold' : 'normal'
  }),
  separator: {
    display: 'block',
    width: 5,
    height: 5,
    borderRadius: '50%',
    backgroundColor: '#666',
    margin: '0 6px'
  }
})

function formatTime(ms: number): string {
  let m = Math.floor(ms / 60000)
  let s = ((ms % 60000) / 1000).toFixed(0)
  return m + ':' + (Number(s) < 10 ? '0' : '') + s
}
