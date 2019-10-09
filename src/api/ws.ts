import {onMessage, onOpen, onClose, onError} from './events'

export const PORT = '5672'
export const TEST_IP = '192.168.0.24'

type Config = {
  ip?: string,
  port?: string
}

export const createSocket = (config: Config = {}) => {
  let socket = new WebSocket(`ws://${config.ip || TEST_IP}:${config.port || PORT}`)
  socket.onopen = onOpen
  socket.onmessage = onMessage
  socket.onclose = onClose
  socket.onerror = onError
  return socket
}