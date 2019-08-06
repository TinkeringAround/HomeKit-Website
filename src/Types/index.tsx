export type TRoom = {
  name: string
  devices: Array<TDevice>
}

export type TDevice = {
  id: string
  name: string
}

export type TStyled = {
  margin?: string
}
