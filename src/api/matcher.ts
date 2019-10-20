type P = {
  channel: string,
}

type Matched = {
  connect: (x: P) => boolean,
  track: (x: P) => boolean,
  time: (x: P) => boolean,
  playState: (x: P) => boolean,
  volume: (x: P) => boolean,
  library: (x: P) => boolean,
  queue: (x: P) => boolean,
  playlists: (x: P) => boolean,
  shuffle: (x: P) => boolean,
  repeat: (x: P) => boolean,
  searchResults: (x: P) => boolean,
}

export const channelMatcher: Matched = {
  connect: ({channel}) => channel === 'connect',
  track: ({channel}) => channel === 'track',
  time: ({channel}) => channel === 'time',
  playState: ({channel}) => channel === 'playState',
  volume: ({channel}) => channel === 'volume',
  library: ({channel}) => channel === 'library',
  queue: ({channel}) => channel === 'queue',
  playlists: ({channel}) => channel === 'playlists',
  shuffle: ({channel}) => channel === 'shuffle',
  repeat: ({channel}) => channel === 'repeat',
  searchResults: ({channel}) => channel === 'search-results',
}
