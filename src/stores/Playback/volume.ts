import {createStore, createEvent} from 'effector'

export const $volume = createStore<number>(30)

export const updateVolume = createEvent<number>()

$volume.on(updateVolume, (_, v) => v)
