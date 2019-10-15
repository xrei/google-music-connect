import {Message} from './types'

export const toMsg = (msg: Message): string => JSON.stringify(msg)
