import React, { useContext, useCallback } from 'react'
import { Heading, Box, Text } from 'grommet'

// Types
import { TRoom, TDevice } from '../../Types'

// Context
import { DatabaseContext } from '../../Contexts'

// Partials
import Dialog from '.'

// Atoms
import { SRow } from '../../Atoms/styled'
import Icon from '../../Atoms/icon'
import IconButton from '../../Atoms/iconButton'

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
      <Heading level="3" size="2em" color="heading" margin="0px 0px 10px 0px">
        {room ? room.name : ''}
      </Heading>

      {/* Devices */}
      {devices && devices.length > 0 && room && (
        <Box
          margin="10px 0px"
          style={{ overflowY: devices.length > 5 ? 'auto' : 'visible', minHeight: '85%' }}
        >
          {devices.map((device: TDevice, index: number) => {
            const isRoomDevice = room.devices.includes(device.id) ? true : false

            return (
              <SRow
                key={'Room-Devices-Dialog-' + index}
                margin="0px 0px 10px 0px"
                active={isRoomDevice}
              >
                <Box width="100%" height="100%" align="center" justify="between" direction="row">
                  <Box width="80%" height="100%" direction="row" align="center">
                    <Box
                      width="3rem"
                      height="3rem"
                      align="center"
                      justify="center"
                      round="10px"
                      background={isRoomDevice ? 'iconWrapperActive' : 'iconWrapperInactive'}
                    >
                      <Icon type={device.type} active={isRoomDevice} size="2.5rem" />
                    </Box>
                    <Text
                      size="1em"
                      weight="bold"
                      color={isRoomDevice ? 'headingActive' : 'headingInactive'}
                      style={{ marginLeft: '.5rem' }}
                    >
                      {device.name}
                    </Text>
                  </Box>
                  <IconButton
                    active={isRoomDevice}
                    wrapper="3rem"
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
