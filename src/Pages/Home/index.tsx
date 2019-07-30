import React, { FC } from 'react'
import { Box } from 'grommet'

// Custom Components
import Background from '../../Components/Background'
import Room from '../../Components/Room'

// Dummy Data
const names = ['Wohnzimmer', 'Küche', 'Schlafzimmer']

//---------------------------------------------
const Home: FC = () => {
  return (
    <Background>
      <Box flex="grow" justify="end">
        <Box width="100%" height="90%" direction="row" wrap={false} style={{ overflowX: 'auto' }}>
          {names.map(roomname => (
            <Room name={roomname} />
          ))}
        </Box>
      </Box>
    </Background>
  )
}

export default Home
