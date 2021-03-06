import { ColorSchemeId } from '@nivo/colors'

// ===============================================
export type TIconType =
  | 'ac'
  | 'humidity'
  | 'light'
  | 'sensor'
  | 'temperature'
  | 'window'
  | 'settings'
  | 'reload'
  | 'signout'
  | 'battery'
  | 'plus'
  | 'minus'

// ===============================================
export type TCredential = {
  email: string
  password: string
}

// ===============================================
export type TDatabase = {
  rooms: Array<TRoom>
  devices: Array<TDevice>
}

export type TRoom = {
  name: string
  devices: Array<string>
}

export type TDeviceType = 'sensor'

export type TDevice = {
  id: string
  name: string
  lastUpdated: string
  battery: number
  type: TDeviceType
  values: Array<TVariable>
}

export type TVariableType = 'humidity' | 'temperature' | 'battery'

export type TVariable = {
  variable: TVariableType
  value: string
}

// ===============================================
export type TStyled = {
  margin?: string
  active?: boolean
  fontSize?: string
}

// ===============================================
export type TDataStream = {
  lines: Array<TLine>
  steps: string
  format: string
  axisBottom: string
}

export type TLine = {
  id: string
  color: ColorSchemeId
  scale: TScale
  data: Array<TChartData>
}

export type TScale = {
  min: number | 'auto'
  max: number | 'auto'
}

export type TMeasurement = {
  timestamp: string
  value: string
}

export type TChartData = {
  x: string
  y: string
}

// ===============================================
export type TTab = 'Räume' | 'Geräte'
