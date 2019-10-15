import {
  createEvent, createStore, createStoreObject, createEffect, combine
} from 'effector'
import {createConnection} from 'api/'
import {onConnOpen} from 'api/events'
import {toMsg} from 'api/utils'
import AuthService, {Device} from 'services/AuthService'
import {history} from 'routes'

type AuthCode = string

export const finishSetup = createEffect<AuthCode, Promise<void>>()
export const IPChangeEvt = createEvent<any>()
export const nameChangeEvt = createEvent<any>()
export const submitFormEvt = createEvent()
export const mountFormEvt = createEvent()
export const unmountFormEvt = createEvent<void>()
export const hideAuthCodeModal = createEvent<any>()
const showAuthCodeModal = createEvent()

export const $modal = createStore(false)
$modal.on(showAuthCodeModal, () => true)
$modal.on(hideAuthCodeModal, () => false)

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
$ip.reset(unmountFormEvt, mountFormEvt)
$name.on(nameChangeEvt.map(trimEvt), (_, name) => name)
$name.reset(unmountFormEvt, mountFormEvt)

submitFormEvt.watch(() => {
  const form = $form.getState()
  console.log(form)
  createConnection(form)
})

createConnection.done.watch(({result}) => {
  showAuthCodeModal()
  result.send(toMsg({
    namespace: 'connect',
    method: 'connect'
  }))
})

finishSetup.use(async (code) => {
  let cfg: Device = {
    code,
    ...$form.getState()
  }
  return AuthService.add(cfg)
})
finishSetup.done.watch(() => {
  onConnOpen()
})
finishSetup.finally.watch(() => {
  history.push('/')
})

function isValidIP(ip: string): boolean {
  return /^(?=\d+\.\d+\.\d+\.\d+$)(?:(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\.?){4}$/.test(ip)
}
