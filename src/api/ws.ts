export const PORT = '5672'
export const TEST_IP = '192.168.0.24'

export type Config = {
  ip?: string,
  port?: string,
}

export const createSocket = (config: Config = {}): Promise<WebSocket> => {
  return new Promise((resolve, reject) => {
    let socket = new WebSocket(`ws://${config.ip || TEST_IP}:${config.port || PORT}`)
    socket.onopen = () => resolve(socket)
    socket.onerror = (err) => reject(err)
  })
}
