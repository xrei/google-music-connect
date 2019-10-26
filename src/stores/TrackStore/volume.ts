import {trackDomain} from './'

export const $volume = trackDomain.store<number>(30)

export const updateVolume = trackDomain.event<number>()

$volume.on(updateVolume, (_, v) => v)
