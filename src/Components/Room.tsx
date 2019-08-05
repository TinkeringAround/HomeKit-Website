import React from 'react'
import { Box, Heading } from 'grommet'

// Custom Components
import Device from './Device'

// Types
import { TDevice } from '../Types'

//-------------------------------------------
interface Props {
  name: string
  devices: Array<TDevice>
}

const Room: React.FC<Props> = ({ name, devices }) => {
  return (
    <Box width="400px" height="100%" margin="0px 0px 0px 30px" style={{ flex: '0 0 auto' }}>
      <Heading level="2" responsive size="large" truncate color="heading">
        {name}
      </Heading>
      <Box wrap direction="row">
        {devices.map((device, index) => {
          return <Device key={'Device-' + index} id={device.id} name={device.name} />
        })}
        <Device id={null} />
      </Box>
    </Box>
  )
}

export default Room
