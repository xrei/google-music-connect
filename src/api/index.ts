import {createDomain} from 'effector'
import {createSocket, Config} from './ws'
import {onMessage, onConnClose, onError} from './events'
import {toMsg} from './utils'
import {ExtTrack} from './types'

export const wsDomain = createDomain('ws')
export const $ws = wsDomain.store<WebSocket | null>(null)
export const createConnection = wsDomain.effect<Config, WebSocket, Error>()

createConnection.use(async (params) => {
  await sleep(500)
  const ws = await createSocket(params)
  return ws
})

$ws.on(createConnection.done, (_, {result: ws}) => {
  ws.onclose = onConnClose
  ws.onerror = onError
  ws.onmessage = onMessage
  return ws
})
$ws.on(createConnection.fail, () => null)

const sendConnect = wsDomain.event<string[] | void>()
$ws.watch(sendConnect, (ws, args) => {
  ws && ws.send(toMsg({
    namespace: 'connect',
    method: 'connect',
    arguments: args || []
  }))
})

const sendNextTrack = wsDomain.event()
$ws.watch(sendNextTrack, (ws) => {
  ws && ws.send(toMsg({namespace: 'playback', method: 'forward'}))
})

const sendPrevTrack = wsDomain.event()
$ws.watch(sendPrevTrack, (ws) => {
  ws && ws.send(toMsg({namespace: 'playback', method: 'rewind'}))
})

const sendPlay = wsDomain.event()
$ws.watch(sendPlay, (ws) => {
  ws && ws.send(toMsg({namespace: 'playback', method: 'playPause'}))
})
const sendPlayQueueTrack = wsDomain.event<ExtTrack>()
$ws.watch(sendPlayQueueTrack, (ws, t) => {
  ws && ws.send(toMsg({namespace: 'queue', method: 'playTrack', arguments: [t]}))
})

const sendPlaybackTime = wsDomain.event<number>()
$ws.watch(sendPlaybackTime, (ws, time) => {
  ws && ws.send(toMsg(
    {namespace: 'playback', method: 'setCurrentTime', arguments: [time]}
  ))
})

export const api = {
  sendConnect,
  sendNextTrack,
  sendPrevTrack,
  sendPlay,
  sendPlayQueueTrack,
  sendPlaybackTime
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
