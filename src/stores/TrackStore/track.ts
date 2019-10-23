import {trackDomain} from './'

export type Track = {
  title: string | null,
  artist: string | null,
  album: string | null,
  albumArt: string | null,
}

const defaultState: Track = {
  title: null,
  artist: null,
  album: null,
  albumArt: null
}

export const $track = trackDomain.store(defaultState)

const changeTrack = trackDomain.event<Track>()

$track.on(changeTrack, (_, track) => track)

export {
  changeTrack
}
