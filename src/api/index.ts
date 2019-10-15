import {createDomain, createEvent} from 'effector'
import {createSocket, Config} from './ws'
export const onMessage = createEvent<MessageEvent>('onMessage')

onMessage.map(({data}) => data).map(JSON.parse)
onMessage.watch(console.log)

export const onConnOpen = createEvent<Event>('onConnOpen')
export const onConnClose = createEvent<CloseEvent>('onConnClose')
export const onError = createEvent<Event>('onError')

export const wsDomain = createDomain('ws')
export const createConnection = wsDomain.effect<Config, WebSocket, Error>()

createConnection.use(async (params) => {
  await sleep(1000)
  const ws = await createSocket(params)
  return ws
})

export const $ws = wsDomain.store<WebSocket | null>(null)

$ws.on(createConnection.done, (_, {result: ws}) => {
  ws.onopen = onConnOpen
  ws.onclose = onConnClose
  ws.onerror = onError
  ws.onmessage = onMessage
  return ws
})
$ws.on(createConnection.fail, () => null)

function sleep(ms: number): Promise<any> {
  return new Promise(resolve => setTimeout(resolve, ms))
}