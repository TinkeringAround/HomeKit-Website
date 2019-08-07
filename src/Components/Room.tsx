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
            return (
              device && <Device key={'RoomDevice-' + index} id={device.id} name={device.name} />
            )
          })}
          <Device id={null} onClick={() => setOpen(true)} />
        </Box>
      </Box>
      <Dialog open={open} closeDialog={() => setOpen(false)}>
        <Heading level="3" size="2em" color="headingInactive" margin="50px 0px 10px 0px">
          Geräteverwaltung
        </Heading>
        {devices.map((device: TDevice, index: number) => {
          const active = roomDevices.find(roomDeviceID => roomDeviceID === device.id) ? true : false
          return (
            <Container
              key={'RoomDevice-Dialog-' + index}
              className="clickable"
              margin="20px 0px 0px 0px"
              onClick={() => selectDevice(index, active)}
              active={active}
            >
              <Text size="large" weight="bold" color={active ? 'headingActive' : 'headingInactive'}>
                {device.name}
              </Text>
            </Container>
          )
        })}
      </Dialog>
    </>
  )
}

export default Room
