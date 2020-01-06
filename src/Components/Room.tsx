import React, { FC, Fragment, useContext } from 'react'
import { Box, Heading } from 'grommet'

// Types
import { TRoom } from '../Types'

// Context
import { DatabaseContext } from '../Contexts'

// Components
import Device from './Device'
import { SInput } from '../Atoms/styled'

// ===============================================
interface Props {
  room: TRoom | null
  selectRoom: ((room: TRoom) => void) | null
}

// ===============================================
const Room: FC<Props> = ({ room, selectRoom }) => {
  const { devices, addRoom } = useContext(DatabaseContext)

  return (
    <Box width="400px" height="100%" margin="0 0 0 2rem" style={{ flex: '0 0 auto' }}>
      {!room && <SInput type="text" placeholder="Neuer Raum..." onKeyPress={addRoom} />}

      {room && selectRoom && (
        <Fragment>
          <Heading
            level="2"
            responsive
            size="3rem"
            margin="2rem 0"
            color="dark"
            truncate
            style={{ cursor: 'default' }}
          >
            {room.name}
          </Heading>

          {/* Devices */}
          <Box direction="row" wrap>
            {room.devices.map((deviceID: string, index: number) => {
              const device = devices.find(device => device.id === deviceID)
              return device && <Device key={'RoomDevice-' + index} device={device} />
            })}
            <Device device={undefined} onClick={() => selectRoom(room)} />
          </Box>
        </Fragment>
      )}
    </Box>
  )
}

export default Room
