import React from 'react'
import {useStoreMap, createComponent, useStore} from 'effector-react'
import {Track} from 'components/Track'
import {$queue} from 'stores/Queue'
import {sendPlayQueueTrack} from 'api'
import {makeStyles, Paper, Typography} from '@material-ui/core'

export const QueueView: React.FC = () => {
  const len = useStore($queue).length
  return (
    len > 0
    ? <TrackList />
    : <EmptyQueue/>
  )
}

const TrackWrapper: React.FC<{id: string}> = ({id}) => {
  const track = useStoreMap({
    store: $queue,
    keys: [id],
    fn: (tracks, [trackId]) => tracks.find(({id}) => id === trackId)
  })

  return track
    ? <Track onClick={sendPlayQueueTrack}
      track={track} menuItems={MenuItems} isPlaying={track.isPlaying}/>
    : <></>
}

const TrackList = createComponent($queue, (_, tracks) => {
  return tracks.map((t, i) => <TrackWrapper id={t.id} key={i} />)
})

const MenuItems = [
  {
    name: 'Remove from queue',
    onClick: (track: any): void => {
      console.log(track)
    }
  }
]

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    padding: 32,
    textAlign: 'center'
  },
  paper: {
    padding: 32
  }
})

const EmptyQueue: React.FC = () => {
  const c = useStyles()
  return (
    <div className={c.root}>
      <Paper className={c.paper} elevation={10}>
        <Typography variant="h6">
          Queue is empty
        </Typography>
        <Typography variant="subtitle1">
          Start some music or add some track to queue 
        </Typography>
      </Paper>
    </div>
  )
}