import React, { FC, useState } from 'react'
import { Box, Heading, Text } from 'grommet'

// Custom Components
import Device from './Device'

// Types
import { TDevice } from '../Types'

// Custom Components
import { Container } from '../Atoms/StyledComponents'
import Dialog from './Dialog'

//-------------------------------------------
interface Props {
  name: string
  index: number
  devices: Array<TDevice>
  roomDevices: Array<string>
  updateRoomDevices: any
}

const Room: FC<Props> = ({ name, index, devices, roomDevices, updateRoomDevices }) => {
  const [open, setOpen] = useState(false)

  const selectDevice = (deviceIndex: number, status: boolean) => {
    var newRoomDevices = Array.from(roomDevices)
    if (status) newRoomDevices.splice(deviceIndex, 1)
    else newRoomDevices.push(devices[deviceIndex].id)

    setOpen(false)
    updateRoomDevices(index, newRoomDevices)
  }

  return (
    <>
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
      <Dialog open={open} closeDialog={() => setOpen(false)}>
        <Heading level="3" size="2em" color="headingInactive" margin="50px 0px 10px 0px">
          {name}
        </Heading>
        {roomDevices.length > 0 && (
          <Box margin="0px 0px 40px 0px">
            <Text
              size="0.75em"
              color="headingInactive"
              margin="10px 0px"
              style={{ paddingLeft: 5 }}
            >
              Geräte entfernen:
            </Text>
            <Box style={{ overflowY: roomDevices.length > 3 ? 'auto' : 'visible' }}>
              {roomDevices.map((deviceID: string, index: number) => {
                const device: TDevice | undefined = devices.find(
                  (device: TDevice) => device.id === deviceID
                )
                return (
                  device && (
                    <Container
                      key={'RoomDevice-Dialog-' + index}
                      className="clickable"
                      margin="0px 0px 10px 0px"
                      onClick={() => selectDevice(index, true)}
                      active={false}
                    >
                      <Text size="1em" weight="bold" color="headingInactive">
                        {device.name}
                      </Text>
                    </Container>
                  )
                )
              })}
            </Box>
          </Box>
        )}

        {devices.length > roomDevices.length && (
          <Box>
            <Text
              size="0.75em"
              color="headingInactive"
              margin="10px 0px"
              style={{ paddingLeft: 5 }}
            >
              Geräte hinzufügen:
            </Text>

            <Box
              style={{ overflowY: devices.length - roomDevices.length > 3 ? 'auto' : 'visible' }}
            >
              {devices.map((device: TDevice, index: number) => {
                const isRoomDevice = roomDevices.find(roomDeviceID => roomDeviceID === device.id)
                  ? true
                  : false
                return (
                  !isRoomDevice && (
                    <Container
                      key={'RoomDevice-Dialog-' + index}
                      className="clickable"
                      margin="0px 0px 10px 0px"
                      onClick={() => selectDevice(index, isRoomDevice)}
                      active={false}
                    >
                      <Text size="large" weight="bold" color="headingInactive">
                        {device.name}
                      </Text>
                    </Container>
                  )
                )
              })}
            </Box>
          </Box>
        )}
      </Dialog>
    </>
  )
}

export default Room
