import {createEvent} from 'effector'
import {toMsg} from './utils'
import AuthService from 'services/AuthService'
import {$ws} from './'

export const onMessage = createEvent<MessageEvent>('onMessage')
const filteredMsg = onMessage.map(({data}) => data).map(JSON.parse)
filteredMsg.watch((data) => {
  const {channel, payload} = data
  console.log(data)
  switch (channel) {
    case 'connect': {
      console.log(payload)
      break
    }
    default: break
  }
})

export const onConnOpen = createEvent<Event | void>('onConnOpen')
onConnOpen.watch(() => {
  AuthService.devices
    .then((v) => {
      console.log(v)
      const ws = $ws.getState()
      ws && ws.send(toMsg({
        namespace: 'connect',
        method: 'connect',
        arguments: [v.name, v.code]
      }))
    })
    .catch(console.log)
})

export const onConnClose = createEvent<CloseEvent>('onConnClose')
export const onError = createEvent<Event>('onError')
