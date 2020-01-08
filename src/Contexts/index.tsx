import React from 'react'

// Types
import { TRoom, TDevice } from '../Types'

// ===============================================
type DatabaseContextProps = {
  reload: (silent: boolean) => void

  // Rooms
  rooms: Array<TRoom>
  addRoom: (event: any) => void
  deleteRoom: (index: number) => void
  renameRoom: (old: string, name: string) => void

  // Devices
  devices: Array<TDevice>
  selectDevice: (device: TDevice) => void
  deleteDevice: (index: number) => void
  renameDevice: (old: string, name: string) => void
}

export const DatabaseContext = React.createContext<DatabaseContextProps>({
  reload: (silent: boolean) => {},

  // Rooms
  rooms: [],
  addRoom: (event: any) => {},
  deleteRoom: (index: number) => {},
  renameRoom: (old: string, name: string) => {},

  // Devices
  devices: [],
  selectDevice: (device: TDevice) => {},
  deleteDevice: (index: number) => {},
  renameDevice: (old: string, name: string) => {}
})
