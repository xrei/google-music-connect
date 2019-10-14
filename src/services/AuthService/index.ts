import Cookies from 'js-cookie'

type Device = {
  code: string,
  ip: string,
  name: string,
}

class AuthService {
  add(deviceObj: Device): void {
    const d = this.devices
    Cookies.set('devices', [...d, deviceObj])
    // console.log('cookie set')
  }
  get devices(): Device[] | [] {
    const d = Cookies.get('devices')
    return d ? JSON.parse(d) : []
  }
  hasDevice(): boolean {
    return Boolean(Cookies.get('devices'))
  }
}

export default new AuthService()
