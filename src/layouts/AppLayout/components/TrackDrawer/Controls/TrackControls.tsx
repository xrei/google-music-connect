import clsx from 'clsx'
import React from 'react'
import {makeStyles, IconButton, Theme} from '@material-ui/core'
import {
  PlayArrow as PlayArrowIcon,
  Pause as PauseIcon,
  SkipPrevious as SkipPreviousIcon,
  SkipNext as SkipNextIcon,
  Repeat as RepeatIcon,
  RepeatOne as RepeatOneIcon,
  ThumbUpOutlined as ThumbUpIcon,
  ThumbUp as ThumbUpAltIcon,
  ThumbDownOutlined as ThumbDownIcon,
  ThumbDown as ThumbDownAltIcon
} from '@material-ui/icons'
import {useStore} from 'effector-react'
import {api} from 'api'
import {$trackTime} from 'stores/Track/trackTime'
import {TrackVolume} from './TrackVolume'
import {onToggleRepeat, $repeat} from 'stores/Playback'
import {toggleThumbsUp, toggleThumbsDown, $rating} from 'stores/Rating'

export const TrackControls: React.FC = () => {
  const rating = useStore($rating)
  const repeat = useStore($repeat)
  const trackTime = useStore($trackTime)
  const c = useStyles()

  return (
    <div className={c.root}>
      <div className={clsx(c.col, c.left)}>
        <IconButton
          onClick={() => toggleThumbsUp()}
          aria-label="Like"
        >
          { rating.liked
            ? <ThumbUpAltIcon className={c.subIcon} />
            : <ThumbUpIcon className={c.subIcon} />
          }
        </IconButton>
        <IconButton
          onClick={() => toggleThumbsDown()}
          aria-label="Dislike"
        >
          { rating.disliked
            ? <ThumbDownAltIcon className={c.subIcon} />
            : <ThumbDownIcon className={c.subIcon} />
          }
        </IconButton>
      </div>
      <div className={c.col}>
        <IconButton aria-label="previous" onClick={() => api.sendPrevTrack()}>
          <SkipPreviousIcon className={c.ctrlIcon} />
        </IconButton>
        <IconButton
          className={c.ctrlPlayBtn} aria-label="play/pause"
          onClick={() => api.sendPlay()}
        >
          { trackTime.isPlaying
            ? <PauseIcon className={c.ctrlIcon} />
            : <PlayArrowIcon className={c.ctrlIcon} />
          }
        </IconButton>
        <IconButton aria-label="next" onClick={() => api.sendNextTrack()}>
          <SkipNextIcon className={c.ctrlIcon} />
        </IconButton>
      </div>
      <div className={clsx(c.col, c.right)}>
        <IconButton aria-label="repeat" onClick={() => onToggleRepeat()}>
          { repeat !== 'SINGLE_REPEAT'
            ? <RepeatIcon
                color={repeat === 'NO_REPEAT' ? 'inherit' : 'primary'}
                className={c.subIcon}
              />
            : <RepeatOneIcon color="primary" className={c.subIcon} />
          }
        </IconButton>
        <TrackVolume />
      </div>
    </div>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  col: {
    display: 'flex',
    flex: 1
  },
  left: {
    justifyContent: 'flex-start',
    marginLeft: 4
  },
  right: {
    justifyContent: 'flex-end',
    marginRight: 4
  },
  ctrlIcon: {
    height: 32,
    width: 32
  },
  subIcon: {
    height: 28,
    width: 28
  },
  ctrlPlayBtn: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.getContrastText(theme.palette.primary.main),
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
    margin: '0 12px'
  }
}))
