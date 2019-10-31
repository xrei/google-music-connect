// pure module, contains only exported units

import {createDomain, createEvent} from 'effector'
import {Config} from './ws'
import {ExtTrack} from './types'

export const wsDomain = createDomain('ws')
export const $ws = wsDomain.store<WebSocket | null>(null)
export const createConnection = wsDomain.effect<Config, WebSocket, Error>()

export const onMessage = createEvent<MessageEvent>('onMessage')
export const onConnOpen = createEvent<Event | void>('onConnOpen')
export const onConnClose = createEvent<CloseEvent>('onConnClose')
export const onError = createEvent<Event>('onError')

const sendConnect = wsDomain.event<string[] | void>()
const sendPrevTrack = wsDomain.event()
const sendNextTrack = wsDomain.event()
const sendPlay = wsDomain.event()
const sendPlayQueueTrack = wsDomain.event<ExtTrack>()
const sendPlaybackTime = wsDomain.event<number>()
const sendSetVolume = wsDomain.event<number>()
const sendToggleRepeat = wsDomain.event()
const sendToggleThumbsUp = wsDomain.event()
const sendToggleThumbsDown = wsDomain.event()

export const api = {
  sendConnect,
  sendNextTrack,
  sendPrevTrack,
  sendPlay,
  sendPlayQueueTrack,
  sendPlaybackTime,
  sendSetVolume,
  sendToggleRepeat,
  sendToggleThumbsUp,
  sendToggleThumbsDown,
}
