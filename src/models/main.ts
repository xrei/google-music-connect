import {createEvent, forward} from 'effector'
import AuthService from 'services/AuthService'
import {createConnection} from 'api'
import Cookies from 'js-cookie'
import {setTheme} from 'stores/Theme'

export const appReady = createEvent('appMounted')

appReady.watch(async () => {
  const device = await AuthService.devices
  createConnection({ip: device.ip})
})

type ThemeVariant = 'Light' | 'Dark'

let getTheme = (): ThemeVariant => Cookies.get('Theme') as ThemeVariant

forward({
  from: appReady,
  to: setTheme.prepend(() => getTheme())
})
