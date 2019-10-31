import {
  onMessage,
  onConnClose,
  onConnOpen,
  onError,
  api,
  createConnection,
  $ws
} from '.'
import AuthService from 'services/AuthService'
import {createSocket} from './ws'

// import api effects (send and recieve)
import './channelEffects'
import './sendEffects'

createConnection.use(async (params) => {
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

onConnOpen.watch((e) => {
  e && console.log('socket connected on: ' + (e.target as WebSocket).url)
  AuthService.devices
    .then((v) => {
      api.sendConnect([v.name, v.code])
    })
    .catch(console.log)
})

onConnClose.watch((e) => {
  console.log(e)
})

onError.watch((e) => {
  console.log(e)
})
