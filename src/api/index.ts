import {createDomain, createEvent} from 'effector'

export const onMessage = createEvent('onMessage')
export const onConnOpen = createEvent('onConnOpen')
export const onConnClose = createEvent<CloseEvent>('onConnClose')
export const onError = createEvent('onError')

export const wsDomain = createDomain('ws')
export const initConnection = wsDomain.event<WebSocket>()

export const $ws = wsDomain.store<WebSocket | null>(null)

$ws.on(initConnection, (_, ws: WebSocket) => ws)
