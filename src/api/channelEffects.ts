// this file contains handlers of recieved messages
// from websocket api channels

import {flow} from 'fp-ts/lib/function'
import {split} from 'effector'
import {onMessage, onConnOpen} from '.'
import {channelComparator} from './comparator'
import {showAuthCodeModal} from 'components/AuthCodeDialog/model'
import {changeTrack} from 'stores/Track/track'
import AuthService from 'services/AuthService'
import {updateTime, setPlaying} from 'stores/Track/trackTime'
import {updateQueue} from 'stores/Queue'
import {updateVolume} from 'stores/Playback'
import {setRepeat} from 'stores/Playback'
import {setRating} from 'stores/Rating'

const parsed = onMessage.map(({data}) => JSON.parse(data))

parsed.watch((d) => {
  if (d.channel === 'time') return
  console.log(d)
})

const channel = split(parsed, channelComparator)

channel.connect.watch((data) => {
  if (data.payload === 'CODE_REQUIRED') {
    showAuthCodeModal()
  } else {
    AuthService.addCode(data.payload)
      .then(() => onConnOpen())
  }
})

let prop = <T extends Record<K, any>, K extends string>(p: K) => (obj: T) => obj[p] 
let apply = <A, B>(f: (a: A) => B) => (x: A): B => f(x)

let handler = (f: any) => flow(prop('payload'), apply(f))

channel.track.watch(handler(changeTrack))
channel.time.watch(({payload}) => updateTime(payload))
channel.playState.watch(({payload}) => setPlaying(payload))
channel.queue.watch(({payload}) => updateQueue(payload))
channel.volume.watch(({payload}) => updateVolume(payload))
channel.repeat.watch(({payload}) => setRepeat(payload))
channel.rating.watch(({payload}) => setRating(payload))
