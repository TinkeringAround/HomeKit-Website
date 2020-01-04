import React, { FC, useState, Fragment } from 'react'
import { Box, Heading, Text } from 'grommet'

// Types
import { TDevice } from '../Types'

// Atoms
import { SRow } from '../Atoms/styled'
import IconButton from '../Atoms/iconButton'

// Components
import Device from './Device'
import Dialog from './Dialog'

// Utility
import { deviceTypeToName } from '../Utility'

// ===============================================
interface Props {
  name: string
  index: number
  devices: Array<TDevice>
  roomDevices: Array<string>
  updateRoomDevices: any
}

// ===============================================
const Room: FC<Props> = ({ name, index, devices, roomDevices, updateRoomDevices }) => {
  const [open, setOpen] = useState(false)

  // ===============================================
  const updateDeviceInRoom = (deviceID: string, isRoomDevice: boolean) => {
    var newRoomDevices = Array.from(roomDevices)
    if (isRoomDevice) {
      const i = roomDevices.findIndex(roomDeviceID => roomDeviceID === deviceID)
      if (i >= 0) newRoomDevices.splice(i, 1)
    } else newRoomDevices.push(deviceID)

    updateRoomDevices(index, newRoomDevices)
  }

  // ===============================================
  return (
    <Fragment>
      <Box width="400px" height="100%" margin="0px 0px 0px 30px" style={{ flex: '0 0 auto' }}>
        <Heading level="2" responsive size="large" truncate color="heading">
          {name}
        </Heading>
        <Box wrap direction="row">
          {roomDevices.map((deviceID, index) => {
            const device = devices.find(device => device.id === deviceID)
            return device && <Device key={'RoomDevice-' + index} id={deviceID} data={device} />
          })}
          <Device id={null} data={undefined} onClick={() => setOpen(true)} />
        </Box>
      </Box>

      {/* Dialog */}
      <Dialog open={open} closeDialog={() => setOpen(false)}>
        <Heading level="3" size="2em" color="heading" margin="50px 0px 10px 0px">
          {name}
        </Heading>

        {/* Devices */}
        {devices.length > 0 && (
          <Box margin="0px 0px 40px 0px">
            <Box margin="10px 0px" style={{ overflowY: devices.length > 7 ? 'auto' : 'visible' }}>
              {devices.map((device: TDevice, index: number) => {
                const isRoomDevice = roomDevices.includes(device.id) ? true : false

                return (
                  <SRow
                    key={'Room-Devices-Dialog-' + index}
                    margin="0px 0px 10px 0px"
                    active={isRoomDevice}
                  >
                    <Box
                      width="100%"
                      height="100%"
                      align="center"
                      justify="between"
                      direction="row"
                    >
                      <Box width="80%" height="100%" direction="row" align="center">
                        <Text
                          size="1em"
                          weight="bold"
                          color={isRoomDevice ? 'headingActive' : 'headingInactive'}
                        >
                          {`${device.name} (${deviceTypeToName(device.type)})`}
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
          </Box>
        )}
      </Dialog>
    </Fragment>
  )
}

export default Room
