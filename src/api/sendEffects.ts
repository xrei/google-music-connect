// this file contains api methods
// that sends messages to websocket api

import {$ws, api} from '.'
import {Message} from './types'

export const toMsg = (msg: Message): string => JSON.stringify(msg)

$ws.watch(api.sendConnect, (ws, args) => {
  ws && ws.send(toMsg({
    namespace: 'connect',
    method: 'connect',
    arguments: args || []
  }))
})

$ws.watch(api.sendNextTrack, (ws) => {
  ws && ws.send(toMsg({namespace: 'playback', method: 'forward'}))
})

$ws.watch(api.sendPrevTrack, (ws) => {
  ws && ws.send(toMsg({namespace: 'playback', method: 'rewind'}))
})

$ws.watch(api.sendPlay, (ws) => {
  ws && ws.send(toMsg({namespace: 'playback', method: 'playPause'}))
})

$ws.watch(api.sendPlayQueueTrack, (ws, t) => {
  ws && ws.send(toMsg({namespace: 'queue', method: 'playTrack', arguments: [t]}))
})

$ws.watch(api.sendPlaybackTime, (ws, time) => {
  ws && ws.send(toMsg(
    {namespace: 'playback', method: 'setCurrentTime', arguments: [time]}
  ))
})

$ws.watch(api.sendSetVolume, (ws, vol) => {
  ws && ws.send(toMsg(
    {namespace: 'volume', method: 'setVolume', arguments: [vol]}
  ))
})

$ws.watch(api.sendToggleRepeat, (ws) => {
  ws && ws.send(toMsg(
    {namespace: 'playback', method: 'toggleRepeat'}
  ))
})

$ws.watch(api.sendToggleThumbsUp, (ws) => {
  ws && ws.send(toMsg(
    {namespace: 'rating', method: 'toggleThumbsUp'}
  ))
})

$ws.watch(api.sendToggleThumbsDown, (ws) => {
  ws && ws.send(toMsg(
    {namespace: 'rating', method: 'toggleThumbsDown'}
  ))
})
