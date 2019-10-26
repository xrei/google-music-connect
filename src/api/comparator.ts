import {
  connectMessage,
  playStateMessage,
  timeMessage,
  trackMessage,
  volumeMessage,
  shuffleMessage,
  repeatMessage,
  libraryMessage,
  queueMessage,
  playlistsMessage,
  searchMessage,
  RatingMessage
} from './types'

export const channelComparator = {
  connect: (p: connectMessage): p is connectMessage => p.channel === 'connect',
  track: (p: trackMessage): p is trackMessage => p.channel === 'track',
  time: (p: timeMessage): p is timeMessage => p.channel === 'time',
  playState: (p: playStateMessage): p is playStateMessage => p.channel === 'playState',
  volume: (p: volumeMessage): p is volumeMessage => p.channel === 'volume',
  library: (p: libraryMessage): p is libraryMessage => p.channel === 'library',
  queue: (p: queueMessage): p is queueMessage => p.channel === 'queue',
  playlists: (p: playlistsMessage): p is playlistsMessage => p.channel === 'playlists',
  shuffle: (p: shuffleMessage): p is shuffleMessage => p.channel === 'shuffle',
  repeat: (p: repeatMessage): p is repeatMessage => p.channel === 'repeat',
  searchResults: (p: searchMessage): p is searchMessage => p.channel === 'search-results',
  rating: (p: RatingMessage): p is RatingMessage => p.channel === 'rating'
}
