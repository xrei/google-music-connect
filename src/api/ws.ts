import {onMessage, onError, onConnOpen, onConnClose} from './'

export const PORT = '5672'
export const TEST_IP = '192.168.0.24'

type Config = {
  ip?: string,
  port?: string,
}

export const createSocket = (config: Config = {}): WebSocket => {
  let socket = new WebSocket(`ws://${config.ip || TEST_IP}:${config.port || PORT}`)
  socket.onopen = onConnOpen
  socket.onmessage = onMessage
  socket.onclose = onConnClose
  socket.onerror = onError
  return socket
}
