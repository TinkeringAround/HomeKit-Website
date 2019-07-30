import React from 'react'
import { Box, Heading } from 'grommet'

// Custom Components
import Sensor from './Sensor'

//-------------------------------------------
interface Props {
  name?: string
}

const Room: React.FC<Props> = ({ name }) => {
  return (
    <Box width="400px" height="100%" margin="0px 0px 0px 30px" style={{ flex: '0 0 auto' }}>
      <Heading level="2" responsive size="large" truncate color="heading">
        {name}
      </Heading>
      <Box wrap direction="row">
        <Sensor isSensor active />
        <Sensor isSensor active />
        <Sensor isSensor active={false} />
        <Sensor isSensor active={false} />
        <Sensor isSensor={false} />
      </Box>
    </Box>
  )
}

export default Room
