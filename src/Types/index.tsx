export type TDatabase = {
  rooms: Array<TRoom>
  devices: Array<TDevice>
}

export type TRoom = {
  name: string
  devices: Array<string>
}

export type TDevice = {
  id: string
  name: string
}

export type TStyled = {
  margin?: string
  active?: boolean
}

export type TDeviceData = {
  id: string
  type: string
  lastUpdated: string
  values: Array<TVariable>
}

export type TVariable = {
  variable: string
  value: string
}
