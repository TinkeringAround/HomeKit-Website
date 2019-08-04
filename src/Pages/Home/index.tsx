import React, { FC, useState } from 'react'
import { Box } from 'grommet'

// Custom Components
import Background from '../../Components/Background'
import Room from '../../Components/Room'
import Settings from '../../Components/Settings'
import Dialog from '../../Components/Dialog'

// Dummy Data
const rooms = [
  {
    name: 'Wohnzimmer',
    devices: [
      {
        name: 'Temp & Feuchtigkeit',
        id: 211
      },
      {
        name: 'Temperatur',
        id: 222
      }
    ]
  },
  {
    name: 'Küche',
    devices: [
      {
        name: 'Feuchtigkeit',
        id: 233
      }
    ]
  },
  {
    name: 'Bad',
    devices: []
  }
]

//---------------------------------------------
const Home: FC = () => {
  const [open, setOpen] = useState<boolean>(false)
  // 1. fetch rooms
  // 2. fetch devices + names

  return (
    <Background>
      <Settings onClick={() => setOpen(true)} />
      <Box height="100%" width="100%" justify="end">
        <Box width="100%" height="90%" direction="row" wrap={false} style={{ overflowX: 'auto' }}>
          {rooms.map((room, index) => (
            <Room key={'Room-' + index} name={room.name} devices={room.devices} />
          ))}
        </Box>
      </Box>
      <Dialog open={open} closeDialog={() => setOpen(false)}>
        {/* Content */}
      </Dialog>
    </Background>
  )
}

export default Home
