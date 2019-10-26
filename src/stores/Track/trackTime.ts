import {trackDomain} from '.'

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

type FormattedState = {
  current: string,
  total: string,
}

export const $fmtTime = trackDomain.store<FormattedState>({current: '-', total: '-'})

$fmtTime.on($trackTime, (_, {current, total}) => {
  return {
    current: formatTime(current),
    total: formatTime(total)
  }
})

function formatTime(ms: number): string {
  let m = Math.floor(ms / 60000)
  let s = ((ms % 60000) / 1000).toFixed(0)
  return m + ':' + (Number(s) < 10 ? '0' : '') + s
}
