import {createEffect, createEvent, createStore, createStoreObject, combine} from 'effector'
import {createConnection} from 'api/'

export const IPChangeEvt = createEvent<any>()
export const nameChangeEvt = createEvent<any>()
export const submitFormEvt = createEvent()
export const mountFormEvt = createEvent()
export const unmountFormEvt = createEvent()

// type FormData = {
//   ip: string,
//   name: string,
// }

export const $ip = createStore<string>('')
export const $ipCorrect = $ip.map(isValidIP)

export const $name = createStore<string>('')
export const $nameCorrect = $name.map<boolean>(val => val.length > 0)

export const $form = createStoreObject({
  ip: $ip,
  name: $name
})

export const $isFormValid = combine(
  $ipCorrect,
  $nameCorrect,
  (ip, name) => ip && name
)

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

function isValidIP(ip: string): boolean {
  return /^(?=\d+\.\d+\.\d+\.\d+$)(?:(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\.?){4}$/.test(ip)
}
