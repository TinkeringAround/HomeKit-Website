import React, { useContext, useCallback } from 'react'
import { Heading, Box, Text, ResponsiveContext } from 'grommet'

// Types
import { TRoom, TDevice } from '../../Types'

// Context
import { DatabaseContext } from '../../Contexts'

// Partials
import Dialog from '.'

// Atoms
import { SRow } from '../../Atoms/styled'
import IconButton from '../../Atoms/iconButton'
import IconBox from '../../Atoms/iconBox'

// Utility
import { deviceTypeToName } from '../../Utility'

// ===============================================
interface Props {
  open: boolean
  close: () => void
  room: TRoom | null
  updateRoomDevices: (roomIndex: number, newRoomDevices: Array<string>) => void
}

// ===============================================
const DeviceDialog: React.FC<Props> = ({ open, close, room, updateRoomDevices }) => {
  const { devices, rooms } = useContext(DatabaseContext)

  const updateDeviceInRoom = useCallback(
    (deviceID: string, isRoomDevice: boolean) => {
      if (room) {
        var newRoomDevices = Array.from(room.devices)
        if (isRoomDevice) {
          const i = room.devices.findIndex(roomDeviceID => roomDeviceID === deviceID)
          if (i >= 0) newRoomDevices.splice(i, 1)
        } else newRoomDevices.push(deviceID)

        const roomIndex = rooms.findIndex(idx => idx.name === room.name)
        updateRoomDevices(roomIndex, newRoomDevices)
      }
    },
    [room, rooms, updateRoomDevices]
  )

  // ===============================================
  return (
    <Dialog open={open} closeDialog={close}>
      <ResponsiveContext.Consumer>
        {size => (
          <Heading
            level="3"
            size={size.includes('small') ? '2.5rem' : '3rem'}
            color="medium"
            margin="0 0 1rem"
          >
            {room ? room.name : ''}
          </Heading>
        )}
      </ResponsiveContext.Consumer>

      {/* Devices */}
      {devices && devices.length > 0 && room && (
        <Box
          margin="1rem 0"
          style={{ overflowY: devices.length > 5 ? 'auto' : 'visible', minHeight: '85%' }}
        >
          {devices.map((device: TDevice, index: number) => {
            const isRoomDevice = room.devices.includes(device.id) ? true : false

            return (
              <SRow key={'Room-Devices-Dialog-' + index} margin="0 0 1rem 0" active={isRoomDevice}>
                <Box width="100%" height="100%" align="center" justify="between" direction="row">
                  <Box flex="grow" height="100%" direction="row" align="center">
                    <Text
                      size="1em"
                      weight="bold"
                      color={isRoomDevice ? 'white' : 'medium'}
                      style={{ marginLeft: '.5rem' }}
                    >
                      {device.name}
                    </Text>
                  </Box>
                  <IconBox
                    type={device.type}
                    active={isRoomDevice}
                    color={!isRoomDevice ? 'rgba(255,255,255,0.65)' : undefined}
                    size="3rem"
                    tooltip={deviceTypeToName(device.type)}
                  />
                  <IconButton
                    active={isRoomDevice}
                    iconType={isRoomDevice ? 'minus' : 'plus'}
                    onClick={() => updateDeviceInRoom(device.id, isRoomDevice)}
                  />
                </Box>
              </SRow>
            )
          })}
        </Box>
      )}
    </Dialog>
  )
}

export default DeviceDialog
