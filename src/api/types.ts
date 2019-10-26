export type Message = {
  namespace: string,
  method: string,
  arguments?: string[] | number[] | ExtTrack[],
}

export type Track = {
  title: string,
  artist: string,
  album: string,
  albumArt: string,
}

export type ExtTrack = Track & {
  albumArtist: string,
  albumId: string,
  artistId: string,
  artistImage?: string,
  id: string,
  duration: number,
  playCount: number,
  index: number,
}

export type connectMessage = {
  channel: 'connect',
  payload: 'CODE_REQUIRED' | string,
}

export type playStateMessage = {
  channel: 'playState',
  payload: boolean,
}

export type trackMessage = {
  channel: 'track',
  payload: Track,
}

export type timeMessage = {
  channel: 'time',
  payload: { current: number, total: number },
}

export type volumeMessage = {
  channel: 'volume',
  payload: number,
}

export type queueMessage = {
  channel: 'queue',
  payload: ExtTrack[],
}

export type playlistsMessage = {
  channel: 'playlists',
  payload: [],
}

export type libraryMessage = {
  channel: 'library',
  payload: {albums: [], artists: [], tracks: []},
}

export type shuffleMessage = {
  channel: 'shuffle',
  payload: string,
}

export type RepeatVariant = 'NO_REPEAT' | 'LIST_REPEAT' | 'SINGLE_REPEAT'

export type repeatMessage = {
  channel: 'repeat',
  payload: RepeatVariant,
}

export type searchMessage = {
  channel: 'search-results',
  payload: any,
}

export type RatingState = {
  liked: boolean, disliked: boolean,
}

export type RatingMessage = {
  channel: 'rating',
  payload: RatingState,
}
