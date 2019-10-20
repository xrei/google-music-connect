import {trackDomain} from './'

type TimeState = {
  current: number,
  total: number,
  isPlaying?: boolean,
}

const defaultState: TimeState = {
  current: 0,
  total: 0,
  isPlaying: false
}

export const $trackTime = trackDomain.store(defaultState)

export const updateTime = trackDomain.event<TimeState>()
export const setPlaying = trackDomain.event<boolean>()

$trackTime.on(updateTime, (state, time) => ({...state, ...time}))
$trackTime.on(setPlaying, (state, isPlaying) => ({...state, isPlaying}))
