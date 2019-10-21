import {createEvent, split} from 'effector'
import AuthService from 'services/AuthService'
import {sendConnect} from './'
import {showAuthCodeModal} from 'components/AuthCodeDialog/model'
import {changeTrack} from 'stores/TrackStore/track'
import {updateTime, setPlaying} from 'stores/TrackStore/trackTime'
import {channelComparator} from './comparator'

export const onMessage = createEvent<MessageEvent>('onMessage')
const filteredMsg = onMessage.map(({data}) => JSON.parse(data))
filteredMsg.watch(console.log)

const channel = split(filteredMsg, channelComparator)
channel.connect.watch((data) => {
  if (data.payload === 'CODE_REQUIRED') {
    showAuthCodeModal()
  } else {
    AuthService.addCode(data.payload)
      .then(() => onConnOpen())
  }  
})
channel.track.watch(({payload}) => {
  console.log(payload)
  changeTrack(payload)
})
channel.time.watch(({payload}) => {
  updateTime({
    current: payload.current,
    total: payload.total
  }) 
})
channel.playState.watch(({payload}) => {
  setPlaying(payload)
})

export const onConnOpen = createEvent<Event | void>('onConnOpen')
onConnOpen.watch((e) => {
  e && console.log('socket connected on: ' + (e.target as WebSocket).url)
  AuthService.devices
    .then((v) => {
      sendConnect([v.name, v.code])
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
