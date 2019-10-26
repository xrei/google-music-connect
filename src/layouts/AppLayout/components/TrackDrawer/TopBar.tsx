import React from 'react'
import {
  makeStyles,
  Card,
  CardMedia,
  Typography
} from '@material-ui/core'
import {$track} from 'stores/Track/track'
import {useStore} from 'effector-react'

export const TopBar: React.FC = (props) => {
  const c = useStyles()
  const track = useStore($track)

  return (
    <Card className={c.card} square>
      <CardMedia
        className={c.cover}
        image={track.albumArt || '-'}
      />
      <div className={c.details}>
        <Typography noWrap>{track.title || '-'}</Typography>
        <Typography variant="caption">{track.artist || '_'}</Typography>
      </div>
    </Card>
  )
}

const useStyles = makeStyles(() => ({
  card: {
    display: 'flex',
    position: 'relative',
    height: '64px',
    width: '100%',
    padding: 4,
    backgroundColor: '#ffffffef',
    zIndex: 1300
  },
  cover: {
    width: 56
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
    alignItems: 'center'
  }
}))
