import {createDomain} from 'effector'
import {onMessage, onOpen, onClose, onError} from './events'

export const wsDomain = createDomain('ws')

export const $ws = wsDomain.store(null)
  .on(onMessage, (_, payload) => {
    console.log(payload)
  })
