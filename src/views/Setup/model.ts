import {
  createEvent, createStore, createStoreObject, combine, createEffect
} from 'effector'
import {sendConnect, createConnection} from 'api/'
import AuthService from 'services/AuthService'
import {history} from 'routes'

export const IPChangeEvt = createEvent<any>()
export const nameChangeEvt = createEvent<any>()
export const submitFormEvt = createEvent()
export const pageMounted = createEvent()
export const pageUnmounted = createEvent<void>()

export const $ip = createStore<string>('')
export const $ipCorrect = $ip.map(isValidIP)

export const $name = createStore<string>('')
export const $nameCorrect = $name.map<boolean>(val => val.length > 0)

export const $form = createStoreObject({
  ip: $ip,
  name: $name
})

const $isFormValid = combine(
  $ipCorrect,
  $nameCorrect,
  (a, b) => a && b
)

export const $isConnecting = createConnection.pending
export const $isSubmitEnabled = combine(
  $isFormValid,
  createConnection.pending,
  (a, b) => a && !b
)

const trimEvt = ({target}: {target: HTMLInputElement}): string => target.value.trim()

$ip.on(IPChangeEvt.map(trimEvt), (_, ip) => ip)
$ip.reset(pageUnmounted, pageMounted)
$name.on(nameChangeEvt.map(trimEvt), (_, name) => name)
$name.reset(pageUnmounted, pageMounted)

submitFormEvt.watch(() => {
  const form = $form.getState()
  const localCon = createConnection(form)
  localCon.then((ws) => {
    sendConnect()
  })
})

export const finishSetup = createEffect<string, void>()
finishSetup.use((code) => {
  sendConnect(['_', code])
  AuthService.add({
    code: '',
    ...$form.getState()
  })
})
finishSetup.done.watch(() => {
  history.push('/')
})

function isValidIP(ip: string): boolean {
  return /^(?=\d+\.\d+\.\d+\.\d+$)(?:(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\.?){4}$/.test(ip)
}

pageMounted.watch(() => {
  if (AuthService.hasDevice()) {
    history.push('/')
  }
})
