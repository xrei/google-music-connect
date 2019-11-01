import {trackDomain} from '.'
import {trackMessage} from 'api/types'

export type Track = trackMessage['payload']

const defaultState: Track = {
  title: '',
  artist: '',
  album: '',
  albumArt: ''
}

export const $track = trackDomain.store(defaultState)

export const changeTrack = trackDomain.event<Track>()

$track.on(changeTrack, (_, track) => track)
