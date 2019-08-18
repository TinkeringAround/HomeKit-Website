import { ColorSchemeId } from '@nivo/colors'

// Login
export type TCredential = {
  email: string
  password: string
}

// Home
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
  lastUpdated: string
  battery: number
  type: string
  values: Array<TVariable>
}

export type TVariable = {
  variable: string
  value: string
}

// Styled Atoms
export type TStyled = {
  margin?: string
  active?: boolean
  fontSize?: string
}

// Charts
export type TDataStream = {
  steps: string
  lines: Array<TLine>
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
