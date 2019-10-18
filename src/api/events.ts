import {createEvent} from 'effector'
import AuthService from 'services/AuthService'
import {showAuthCodeModal} from 'components/AuthCodeDialog/model'
import {sendConnect} from './'

export const onMessage = createEvent<MessageEvent>('onMessage')
const filteredMsg = onMessage.map(({data}) => data).map(JSON.parse)
filteredMsg.watch((data) => {
  const {channel, payload} = data
  console.log(data)
  switch (channel) {
    case 'connect': {
      console.log(payload)
      if (payload === 'CODE_REQUIRED') {
        showAuthCodeModal()
      } else {
        AuthService.addCode(payload)
          .then(() => onConnOpen())
      }
      break
    }
    default: break
  }
})

export const onConnOpen = createEvent<Event | void>('onConnOpen')
onConnOpen.watch((e) => {
  e && console.log('socket connected on: ' + (e.target as WebSocket).url)
  AuthService.devices
    .then((v) => sendConnect([v.name, v.code]))
    .catch(console.log)
})

export const onConnClose = createEvent<CloseEvent>('onConnClose')
export const onError = createEvent<Event>('onError')
