import {split} from 'effector'
import {onMessage, onConnOpen} from './events'
import {channelComparator} from './comparator'
import {showAuthCodeModal} from 'components/AuthCodeDialog/model'
import {changeTrack} from 'stores/TrackStore/track'
import {updateTime, setPlaying} from 'stores/TrackStore/trackTime'
import {updateQueue} from 'stores/Queue'
import {updateVolume} from 'stores/Playback'
import AuthService from 'services/AuthService'
import {setRepeat} from 'stores/Playback'
import {setRating} from 'stores/Rating'

export const addHandlers = (): void => {
  const filteredMsg = onMessage.map(({data}) => JSON.parse(data))

  filteredMsg.watch((d) => {
    if (d.channel === 'time') return
    console.log(d)
  })
  
  const channel = split(filteredMsg, channelComparator)

  channel.connect.watch((data) => {
    if (data.payload === 'CODE_REQUIRED') {
      showAuthCodeModal()
    } else {
      AuthService.addCode(data.payload)
        .then(() => onConnOpen())
    }  
  })

  channel.track.watch(({payload}) => changeTrack(payload))

  channel.time.watch(({payload}) => {
    updateTime({
      current: payload.current,
      total: payload.total
    }) 
  })

  channel.playState.watch(({payload}) => setPlaying(payload))

  channel.queue.watch(({payload}) => updateQueue(payload))

  channel.volume.watch(({payload}) => updateVolume(payload))

  channel.repeat.watch(({payload}) => setRepeat(payload))

  channel.rating.watch(({payload}) => setRating(payload))
}
