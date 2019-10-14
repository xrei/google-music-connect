import {createDomain, createEvent} from 'effector'

export const onMessage = createEvent<MessageEvent>('onMessage')

onMessage.map(({data}) => data).map(JSON.parse)

export const onConnOpen = createEvent<Event>('onConnOpen')
export const onConnClose = createEvent<CloseEvent>('onConnClose')
export const onError = createEvent<Event>('onError')

export const wsDomain = createDomain('ws')
export const createConnection = wsDomain.event<WebSocket>()

export const $ws = wsDomain.store<WebSocket | null>(null)

$ws.on(createConnection, (_, ws: WebSocket) => ws)
