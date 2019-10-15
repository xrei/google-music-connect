export type Message = {
  namespace: string,
  method: string,
  arguments?: string[] | number[],
}
