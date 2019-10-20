import React from 'react'
import {useStore} from 'effector-react'
import {Theme, makeStyles} from '@material-ui/core/styles';
import {Card, CardMedia, IconButton, Typography} from '@material-ui/core'
import {
  PlayArrow as PlayArrowIcon,
  Pause as PauseIcon,
  SkipPrevious as SkipPreviousIcon,
  SkipNext as SkipNextIcon
} from '@material-ui/icons'
import {$track} from 'stores/TrackStore/track'
import {$trackTime} from 'stores/TrackStore/trackTime'
import {sendNextTrack, sendPrevTrack, sendPlay} from 'api'

const useStyles = makeStyles((theme: Theme) => ({
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
    marginLeft: 10
  },
  controls: {
    display: 'flex',
    alignItems: 'center'
  },
  ctrlIcon: {
    height: 40,
    width: 40,
  },
  trackTitle: {
    fontWeight: 'bold'
  }
}))

export const TrackPanel: React.FC = () => {
  const c = useStyles()
  const track = useStore($track)
  const trackTime = useStore($trackTime)
  const art = track.albumArt || '_'

  return (
    <Card className={c.card} square>
      <CardMedia
        className={c.cover}
        image={art}
      />
      <div className={c.details}>
        <Typography className={c.trackTitle}>{track.title || '-'}</Typography>
        <Typography>{track.artist || '_'}</Typography>
      </div>
      <div className={c.controls}>
        <IconButton aria-label="previous" onClick={() => sendPrevTrack()}>
          <SkipPreviousIcon />
        </IconButton>
        <IconButton aria-label="play/pause" onClick={() => sendPlay()}>
          { trackTime.isPlaying
            ? <PauseIcon color="secondary" className={`${c.ctrlIcon}`} />
            : <PlayArrowIcon className={c.ctrlIcon} />
          }
        </IconButton>
        <IconButton aria-label="next" onClick={() => sendNextTrack()}>
          <SkipNextIcon />
        </IconButton>
      </div>
    </Card>
  )
}
