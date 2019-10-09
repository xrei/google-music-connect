import {Message} from './types'
import {wsDomain} from './'

export const onMessage = wsDomain.event<Message>('onMessage')
  .map(({data}) => data).map(JSON.parse)

export const onOpen = wsDomain.event<Event>('onOpen')
export const onClose = wsDomain.event<CloseEvent>('onClose')
export const onError = wsDomain.event<Event>('onError')