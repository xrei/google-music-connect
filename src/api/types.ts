export type Message = {
  namespace: string,
  method: string,
  arguments?: string[] | number[],
}

export type Data = {
  channel: string,
  payload: any,
}
