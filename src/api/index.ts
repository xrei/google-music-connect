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
    arguments: args ? args : undefined
  }))
})

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
