import React, { FC, useState, useEffect } from 'react'
import { Box } from 'grommet'
import firebase from 'firebase'

// Types
import { TRoom } from '../../Types/'

// Custom Components
import Background from '../../Components/Background'
import Room from '../../Components/Room'
import Settings from '../../Components/Settings'
import Dialog from '../../Components/Dialog'
import RoomManagement from '../../Components/RoomManagement'

// Dummy Data
/*const roomNames = [
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
]*/

//---------------------------------------------
const Home: FC = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [rooms, setRooms] = useState<Array<TRoom>>([])

  useEffect(() => {
    if (loading && rooms.length === 0) {
      firebase
        .database()
        .ref('/rooms')
        .once('value')
        .then(snapshot => {
          if (snapshot.hasChildren()) {
            var rooms: Array<TRoom> = []

            snapshot.forEach(room => {
              console.log('Room: ' + room.key)
              console.log(room.val())
              rooms = [
                ...rooms,
                {
                  name: room.key ? room.key : '',
                  devices: room.val()
                }
              ]
            })

            setRooms(rooms)
          }
          setLoading(false)
        })
    } else {
      var updates: any = {}
      rooms.forEach(room => {
        updates['rooms/' + room.name] = room.devices
      })
      firebase
        .database()
        .ref()
        .update(updates)
    }
  }, [rooms])

  const updateRooms = (event: any) => {
    if (event && event.key === 'Enter') {
      if (event.target.value !== '') {
        const name = event.target.value
        event.target.value = ''
        setRooms([
          ...rooms,
          {
            name: name,
            devices: []
          }
        ])
      }
    }
  }

  return (
    <Background>
      {loading ? (
        <div />
      ) : (
        <>
          <Settings onClick={() => setOpen(true)} />
          <Box height="100%" width="100%" justify="end">
            <Box
              width="100%"
              height="90%"
              direction="row"
              wrap={false}
              style={{ overflowX: 'auto' }}
            >
              {rooms.map((room: TRoom, index: number) => (
                <Room key={'Room-' + index} name={room.name} devices={room.devices} />
              ))}
            </Box>
          </Box>
          <Dialog open={open} closeDialog={() => setOpen(false)}>
            <RoomManagement updateRooms={updateRooms} rooms={rooms} />
          </Dialog>
        </>
      )}
    </Background>
  )
}

export default Home
