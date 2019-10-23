import {createEvent, createStore} from 'effector'
import {ExtTrack} from 'api/types'

export const $queue = createStore<ExtTrack[]>([])

export const updateQueue = createEvent<ExtTrack[]>()

$queue.on(updateQueue, (s, p) => p)
