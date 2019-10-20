import {createEvent, split} from 'effector'
import AuthService from 'services/AuthService'
import {Data} from './types'
import {sendConnect} from './'
import {showAuthCodeModal} from 'components/AuthCodeDialog/model'
import {changeTrack} from 'stores/TrackStore/track'
import {updateTime, setPlaying} from 'stores/TrackStore/trackTime'
import {channelMatcher} from './matcher'


export const onMessage = createEvent<MessageEvent>('onMessage')
const filteredMsg = onMessage.map(({data}) => JSON.parse(data) as Data)

const channel = split(filteredMsg, channelMatcher)
channel.connect.watch(({payload}) => {
  if (payload === 'CODE_REQUIRED') {
    showAuthCodeModal()
  } else {
    AuthService.addCode(payload)
      .then(() => onConnOpen())
  }  
})
channel.track.watch(({payload}) => {
  const {title, artist, album, albumArt} = payload
  console.log(payload)
  changeTrack({title, artist, album, albumArt})
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
export const onError = createEvent<Event>('onError')
