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
import RoomManagement from '../../Components/RoomManagement'
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
                      name: device.val().name
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
      console.log('Room Updates: ', updates)
      firebase
        .database()
        .ref()
        .child('rooms')
        .remove()
        .then(() => {
          firebase
            .database()
            .ref()
            .update(updates)
        })
    }
  }, [rooms])

  useEffect(() => {
    if (!loading) {
      var updates: any = {}
      devices.forEach(device => {
        updates['devices/' + device.id] = { name: device.name }
      })
      console.log('Device Updates: ', updates)
      firebase
        .database()
        .ref()
        .child('devices')
        .remove()
        .then(() => {
          firebase
            .database()
            .ref()
            .update(updates)
        })
    }
  }, [devices])

  // Handlers
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
      var newRooms = Array.from(rooms)
      newRooms[index].name = newName
      setRooms(newRooms)
    }
  }
  const deleteRoom = (index: number) => {
    rooms.splice(index, 1)
    setRooms(rooms)
  }
  const reorderRooms = (source: number, destination: number) => {
    const room = rooms[source]
    rooms.splice(source, 1)
    rooms.splice(destination, 0, room)
    setRooms(rooms)
  }
  const updateDeviceName = (oldName: string, newName: string) => {
    const device = devices.find((device: TDevice) => device.name === oldName)
    if (device) {
      const index = devices.indexOf(device)
      var newDevices = Array.from(devices)
      newDevices[index].name = newName
      setDevices(newDevices)
    }
  }
  const deleteDevice = (index: number) => {
    const newDevices = Array.from(devices)
    newDevices.splice(index, 1)
    setDevices(newDevices)
  }
  const reorderDevices = (source: number, destination: number) => {
    const device = devices[source]
    const newDevices = Array.from(devices)
    newDevices.splice(source, 1)
    newDevices.splice(destination, 0, device)
    console.log('New Devices after reorder: ', newDevices)
    setDevices(newDevices)
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
                <SwitchIcon icon="circleEmpty" onClick={() => setMode('device')} />
                <RoomManagement
                  addRoom={addRoom}
                  updateRoomName={updateRoomName}
                  reorderRooms={reorderRooms}
                  deleteRoom={deleteRoom}
                  rooms={rooms}
                />
              </>
            ) : (
              <>
                <SwitchIcon icon="circleFull" onClick={() => setMode('room')} />
                <DeviceManagement
                  updateDeviceName={updateDeviceName}
                  deleteDevice={deleteDevice}
                  reorderDevices={reorderDevices}
                  devices={devices}
                />
              </>
            )}
          </Dialog>
        </>
      )}
    </Background>
  )
}

export default Home
