import {createEvent, createStore} from 'effector'
import {RepeatVariant} from 'api/types'
import {api} from 'api'

export const $repeat = createStore<RepeatVariant>('NO_REPEAT')

export const setRepeat = createEvent<RepeatVariant>()
export const onToggleRepeat = createEvent()

onToggleRepeat.watch(() => {
  api.sendToggleRepeat()
})

$repeat.on(setRepeat, (_, v) => v)
