import {createDomain, createEvent} from 'effector'
import {createSocket, Config} from './ws'
import {onMessage, onConnClose, onError} from './events'
import {toMsg} from './utils'

export const wsDomain = createDomain('ws')
export const $ws = wsDomain.store<WebSocket | null>(null)
export const createConnection = wsDomain.effect<Config, WebSocket, Error>()

createConnection.use(async (params) => {
  await sleep(1000)
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

export const sendConnect = wsDomain.event<string[] | void>()
$ws.watch(sendConnect, (ws, args) => {
  ws && ws.send(toMsg({
    namespace: 'connect',
    method: 'connect',
    arguments: args || []
  }))
})

export const sendNextTrack = wsDomain.event()
$ws.watch(sendNextTrack, (ws) => {
  ws && ws.send(toMsg({namespace: 'playback', method: 'forward'}))
})

export const sendPrevTrack = wsDomain.event()
$ws.watch(sendPrevTrack, (ws) => {
  ws && ws.send(toMsg({namespace: 'playback', method: 'rewind'}))
})

export const sendPlay = wsDomain.event()
$ws.watch(sendPlay, (ws) => {
  ws && ws.send(toMsg({namespace: 'playback', method: 'playPause'}))
})

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
