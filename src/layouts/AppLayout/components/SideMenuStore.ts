import {createEvent, createStore} from 'effector'

export let onOpen = createEvent()
export let onClose = createEvent()
export let toggle = createEvent()

export let $drawer = createStore(false)
  .on(onOpen, () => true)
  .on(onClose, () => false)
  .on(toggle, state => !state)
  