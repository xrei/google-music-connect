import {createEvent} from 'effector'
import AuthService from 'services/AuthService'
import {api} from './'
import {addHandlers} from './channelHandlers'

export const onMessage = createEvent<MessageEvent>('onMessage')
addHandlers() // dirty hack, or maybe not.

export const onConnOpen = createEvent<Event | void>('onConnOpen')
onConnOpen.watch((e) => {
  e && console.log('socket connected on: ' + (e.target as WebSocket).url)
  AuthService.devices
    .then((v) => {
      api.sendConnect([v.name, v.code])
    })
    .catch(console.log)
})

export const onConnClose = createEvent<CloseEvent>('onConnClose')
onConnClose.watch((e) => {
  console.log(e)
})

export const onError = createEvent<Event>('onError')
onError.watch((e) => {
  console.log(e)
})
