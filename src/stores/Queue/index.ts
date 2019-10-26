import {createEvent, createStore} from 'effector'
import {ExtTrack} from 'api/types'
import {$track, Track} from 'stores/Track/track'

type QueueTracks = ExtTrack & { isPlaying?: boolean }

let mapQueue = (q: ExtTrack[], track: Track): QueueTracks[] =>
  q.map(t => ({...t, isPlaying: t.title === track.title}))

export const $queue = createStore<QueueTracks[]>([])

export const updateQueue = createEvent<ExtTrack[]>()

$queue.on(updateQueue, (_, p) => p)
$queue.on($track, (queue, track) => mapQueue(queue, track))
