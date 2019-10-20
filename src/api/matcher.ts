type P = {
  channel: string,
}

type Matched = {
  connect: (x: P) => boolean,
  track: (x: P) => boolean,
  time: (x: P) => boolean,
  playState: (x: P) => boolean,
}

export const channelMatcher: Matched = {
  connect: ({channel}) => channel === 'connect',
  track: ({channel}) => channel === 'track',
  time: ({channel}) => channel === 'time',
  playState: ({channel}) => channel === 'playState'
}
