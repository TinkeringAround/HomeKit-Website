import React, { FC, useState, useEffect } from 'react'
import { Box } from 'grommet'
import firebase from 'firebase'
import { CircleSpinner } from 'react-spinners-kit'

// Types
import { TRoom, TDevice } from '../../Types/'

// Theme
import { theme } from '../../theme'

// Custom Components
import Background from '../../Components/Background'
import Room from '../../Components/Room'
import Settings from '../../Components/Settings'
import Dialog from '../../Components/Dialog'
import RoomManagement from '../../Components/RoomManagement/'
import SwitchIcon from '../../Components/Switch'
import DeviceManagement from '../../Components/DeviceManagement'

//---------------------------------------------
const Home: FC = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [open, setOpen] = useState<boolean>(false)
  const [mode, setMode] = useState<string>('room')
  const [rooms, setRooms] = useState<Array<TRoom>>([])
  const [devices, setDevices] = useState<Array<TDevice>>([])

  useEffect(() => {
    if (loading && rooms.length === 0 && devices.length === 0) {
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

          firebase
            .database()
            .ref('/devices')
            .once('value')
            .then(snapshot => {
              if (snapshot.hasChildren()) {
                var devices: Array<TDevice> = []

                snapshot.forEach(device => {
                  console.log('Device: ' + device.key)
                  console.log(device.val())
                  devices = [
                    ...devices,
                    {
                      id: device.key ? device.key : '',
                      name: device.val()
                    }
                  ]
                })

                setDevices(devices)
              }
            })

          setLoading(false)
        })
    }
  })

  useEffect(() => {
    if (!loading) {
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

  useEffect(() => {
    if (!loading) {
      var updates: any = {}
      devices.forEach(device => {
        updates['devices/' + device.id] = device.name
      })
      firebase
        .database()
        .ref()
        .update(updates)
    }
  }, [devices])

  // Room Handlers
  const addRoom = (event: any) => {
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
  const updateRoomName = (oldName: string, newName: string) => {
    const room = rooms.find((room: TRoom) => room.name === oldName)
    if (room) {
      const index = rooms.indexOf(room)
      var tmpRooms = rooms
      tmpRooms[index].name = newName
      setRooms(tmpRooms)
    }
  }
  const deleteRoom = (index: number) => {
    rooms.splice(index, 1)
    setRooms(rooms)
  }

  return (
    <Background>
      {loading ? (
        <Box height="100%" width="100%" justify="center" align="center">
          <CircleSpinner size={150} color={theme.global.colors.darkYellow} />
        </Box>
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
            {mode === 'room' ? (
              <>
                <SwitchIcon icon="circleEmpty" onClick={() => setMode('sensor')} />
                <RoomManagement
                  addRoom={addRoom}
                  updateRoomName={updateRoomName}
                  deleteRoom={deleteRoom}
                  rooms={rooms}
                />
              </>
            ) : (
              <>
                <SwitchIcon icon="circleFull" onClick={() => setMode('room')} />
                <DeviceManagement devices={devices} />
              </>
            )}
          </Dialog>
        </>
      )}
    </Background>
  )
}

export default Home
