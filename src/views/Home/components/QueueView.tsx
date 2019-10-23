import React from 'react'
import {useStoreMap, createComponent} from 'effector-react'
import {Track} from 'components/Track'
import {$queue} from 'stores/Queue'

export const QueueView: React.FC = () => {

  return (
    <TrackList />
  )
}

const TrackWrapper: React.FC<{id: string}> = ({id}) => {
  const track = useStoreMap({
    store: $queue,
    keys: [id],
    fn: (tracks, [trackId]) => tracks.find(({id}) => id === trackId)
  })
  return track ? <Track track={track} menuItems={MenuItems}/> : <></>
}

const TrackList = createComponent($queue, (_, tracks) => {
  return tracks.map((t, i) => <TrackWrapper id={t.id} key={i} />)
})

const MenuItems = [
  {
    name: 'Add to queue',
    onClick: (track: any): void => {
      console.log(track)
    }
  }
]