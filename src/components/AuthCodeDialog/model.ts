import {createEvent, createStore} from 'effector'

export const hideAuthCodeModal = createEvent() as any
export const showAuthCodeModal = createEvent()

export const $modal = createStore(false)
$modal.on(showAuthCodeModal, () => true)
$modal.on(hideAuthCodeModal, () => false)
