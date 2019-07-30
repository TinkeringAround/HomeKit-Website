import React from 'react'
import { Box, Heading } from 'grommet'

// Custom Components
import IoT from './IoT'

// Dummy Data
const data = [
  {
    id: '1',
    name: 'Sensor',
    type: 'sensor',
    values: [
      {
        variable: 'temperatur',
        value: '28',
        unit: 'celsius'
      },
      {
        variable: 'humidity',
        value: '65',
        unit: 'percent'
      }
    ]
  },
  {
    id: '2',
    name: 'Sensor',
    type: 'sensor',
    values: []
  }
]

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
        {data.map((iot, index) => {
          return <IoT key={'IoT-' + iot.id + '-' + index} isSensor data={iot} />
        })}
        <IoT isSensor={false} />
      </Box>
    </Box>
  )
}

export default Room
