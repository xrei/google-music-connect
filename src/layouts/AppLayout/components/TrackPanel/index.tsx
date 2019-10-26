import React from 'react'
import {useStore} from 'effector-react'
import {makeStyles} from '@material-ui/core/styles';
import {Card, CardMedia, IconButton, Typography} from '@material-ui/core'
import {
  PlayArrow as PlayArrowIcon,
  Pause as PauseIcon,
  SkipPrevious as SkipPreviousIcon,
  SkipNext as SkipNextIcon
} from '@material-ui/icons'
import {api} from 'api'
import {$track} from 'stores/TrackStore/track'
import {$trackTime} from 'stores/TrackStore/trackTime'

export const TrackPanel: React.FC = () => {
  const c = useStyles()
  const track = useStore($track)
  const trackTime = useStore($trackTime)
  const art = track.albumArt || '_'

  return (
    <Card className={c.card} square elevation={10}>
      <CardMedia
        className={c.cover}
        image={art}
      />
      <div className={c.details}>
        <Typography noWrap className={c.trackTitle}>{track.title || '-'}</Typography>
        <Typography >{track.artist || '_'}</Typography>
      </div>
      <div className={c.controls}>
        <IconButton aria-label="previous" onClick={() => api.sendPrevTrack()}>
          <SkipPreviousIcon />
        </IconButton>
        <IconButton aria-label="play/pause" onClick={() => api.sendPlay()}>
          { trackTime.isPlaying
            ? <PauseIcon color="secondary" className={`${c.ctrlIcon}`} />
            : <PlayArrowIcon className={c.ctrlIcon} />
          }
        </IconButton>
        <IconButton aria-label="next" onClick={() => api.sendNextTrack()}>
          <SkipNextIcon />
        </IconButton>
      </div>
    </Card>
  )
}

const useStyles = makeStyles(() => ({
  card: {
    display: 'flex',
    position: 'relative',
    height: '80px',
    width: '100%',
    padding: 4
  },
  cover: {
    width: 64
  },
  details: {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    flex: 1,
    marginLeft: 10,
    overflow: 'hidden'
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    zIndex: 1200
  },
  ctrlIcon: {
    height: 40,
    width: 40,
  },
  trackTitle: {
    fontWeight: 'bold',
  }
}))
