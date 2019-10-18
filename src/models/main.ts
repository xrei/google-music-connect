import {createEvent} from 'effector'
import AuthService from 'services/AuthService'
import {createConnection} from 'api'

export const appReady = createEvent('appMounted')

appReady.watch(async () => {
  const device = await AuthService.devices
  createConnection({ip: device.ip})
})
