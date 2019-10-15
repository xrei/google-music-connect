import {createDomain} from 'effector'
import {createSocket, Config} from './ws'
import {onMessage, onConnClose, onError} from './events'

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

function sleep(ms: number): Promise<any> {
  return new Promise(resolve => setTimeout(resolve, ms))
}