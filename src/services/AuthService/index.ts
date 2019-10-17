import Cookies from 'js-cookie'

export type Device = {
  code: string, // unique code
  ip: string, // ip of the device
  name: string, // device name
}

class AuthService {
  add(deviceObj: Device): Promise<void> {
    return new Promise(resolve => {
      Cookies.set('devices', deviceObj, {expires: 365})
      resolve()
    })
  }
  async addCode(code: string): Promise<void> {
    const d = await this.devices
    await this.add({
      ...d,
      code
    })
    return Promise.resolve()
  }
  get devices(): Promise<Device> {
    return new Promise((res, rej) => {
      const d = Cookies.get('devices')
      d ? res(JSON.parse(d)) : rej(Error('No saved device'))
    })
  }
  hasDevice(): boolean {
    return Boolean(Cookies.get('devices'))
  }
}

export default new AuthService()
