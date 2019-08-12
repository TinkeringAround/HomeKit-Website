import React, { FC, useState, useEffect } from 'react'
import { Box } from 'grommet'
import firebase from 'firebase'
import { CircleSpinner } from 'react-spinners-kit'

// Types
import { TRoom, TDevice, TDatabase } from '../../Types/'

// Theme
import { theme } from '../../theme'

// Custom Components
import Background from '../../Components/Background'
import Room from '../../Components/Room'
import Settings from '../../Components/Settings'
import Dialog from '../../Components/Dialog'
import RoomManagement from '../../Components/RoomManagement'
import DeviceManagement from '../../Components/DeviceManagement'
import Switch from '../../Components/Switch'
import Reload from '../../Components/Reload'
import Signout from '../../Components/Signout'

//---------------------------------------------
const Home: FC = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [open, setOpen] = useState<boolean>(false)
  const [mode, setMode] = useState<string>('room')
  const [data, setData] = useState<TDatabase>()

  // Life Cycle
  useEffect(() => {
    if (!data) fetchData()
  })

  useEffect(() => {
    if (loading && data) {
      console.log('Data: ', data)
      setLoading(false)
    }
  }, [data])

  // Firebase Updater Methods
  const fetchData = () => {
    setLoading(true)
    firebase
      .database()
      .ref('/')
      .once('value')
      .then(snapshot => {
        if (snapshot.hasChildren()) {
          const tmpDatabase = snapshot.val()
          var rooms: Array<TRoom> = []
          var devices: Array<TDevice> = []

          if (tmpDatabase.hasOwnProperty('rooms')) {
            console.log('Rooms: ', tmpDatabase.rooms)
            const roomKeys = Object.keys(tmpDatabase.rooms)
            roomKeys.forEach(key => {
              rooms = [
                ...rooms,
                {
                  name: key,
                  devices: tmpDatabase.rooms[key].devices
                }
              ]
            })
          }

          if (tmpDatabase.hasOwnProperty('devices')) {
            console.log('Devices: ', tmpDatabase.devices)
            const deviceKeys = Object.keys(tmpDatabase.devices)
            deviceKeys.forEach(key => {
              devices = [
                ...devices,
                {
                  id: key,
                  name: tmpDatabase.devices[key].name,
                  lastActive: tmpDatabase.devices[key].lastActive
                }
              ]
            })
          }

          const data: TDatabase = {
            rooms: rooms,
            devices: devices
          }

          setData(data)
        }
      })
  }
  const updateRooms = (newRooms: Array<TRoom>) => {
    if (data) {
      var updates: any = {}
      newRooms.forEach(room => {
        updates['rooms/' + room.name] = { devices: room.devices }
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
            .then(() => {
              setData({
                devices: data.devices,
                rooms: newRooms
              })
            })
        })
    }
  }
  const updateDevices = (newDevices: Array<TDevice>) => {
    if (data) {
      var updates: any = {}
      newDevices.forEach(device => {
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
            .then(() => {
              setData({
                devices: newDevices,
                rooms: data.rooms
              })
            })
        })
    }
  }

  //#region Component Callbacks...
  const addRoom = (event: any) => {
    if (data && event && event.key === 'Enter') {
      if (event.target.value !== '') {
        const name = event.target.value
        event.target.value = ''
        updateRooms([
          ...data.rooms,
          {
            name: name,
            devices: []
          }
        ])
      }
    }
  }
  const updateRoomName = (oldName: string, newName: string) => {
    if (data) {
      const index = data.rooms.findIndex((room: TRoom) => room.name === oldName)
      if (index >= 0) {
        var newRooms = Array.from(data.rooms)
        newRooms[index].name = newName
        updateRooms(newRooms)
      }
    }
  }
  const updateRoomDevices = (index: number, newDevices: Array<string>) => {
    if (data) {
      const newRooms = Array.from(data.rooms)
      newRooms[index].devices = newDevices
      updateRooms(newRooms)
    }
  }
  const deleteRoom = (index: number) => {
    if (data) {
      const newRooms = Array.from(data.rooms)
      newRooms.splice(index, 1)
      updateRooms(newRooms)
    }
  }
  const reorderRooms = (source: number, destination: number) => {
    if (data) {
      const room = data.rooms[source]
      const newRooms = Array.from(data.rooms)
      newRooms.splice(source, 1)
      newRooms.splice(destination, 0, room)
      updateRooms(newRooms)
    }
  }
  // for Devices
  const updateDeviceName = (oldName: string, newName: string) => {
    if (data) {
      const index = data.devices.findIndex((device: TDevice) => device.name === oldName)
      if (index) {
        var newDevices = Array.from(data.devices)
        newDevices[index].name = newName
        updateDevices(newDevices)
      }
    }
  }
  const deleteDevice = (index: number) => {
    if (data) {
      const newDevices = Array.from(data.devices)
      newDevices.splice(index, 1)
      updateDevices(newDevices)
    }
  }
  const reorderDevices = (source: number, destination: number) => {
    if (data) {
      const device = data.devices[source]
      const newDevices = Array.from(data.devices)
      newDevices.splice(source, 1)
      newDevices.splice(destination, 0, device)
      updateDevices(newDevices)
    }
  }
  //#endregion

  //-----------------------------------------------------------------
  return (
    <Background>
      {loading ? (
        <Box height="100%" width="100%" justify="center" align="center">
          <CircleSpinner size={150} color={theme.global.colors.darkYellow} />
        </Box>
      ) : (
        <>
          <Signout onClick={() => firebase.auth().signOut()} />
          <Reload onClick={fetchData} />
          <Settings onClick={() => setOpen(true)} />
          <Box height="100%" width="100%" justify="end">
            <Box
              width="100%"
              height="90%"
              direction="row"
              wrap={false}
              style={{ overflowX: 'auto' }}
            >
              {data &&
                data.rooms.map((room: TRoom, index: number) => (
                  <Room
                    key={'Room-' + index}
                    name={room.name}
                    index={index}
                    roomDevices={room.devices}
                    devices={data.devices}
                    updateRoomDevices={updateRoomDevices}
                  />
                ))}
            </Box>
          </Box>
          <Dialog open={open} closeDialog={() => setOpen(false)}>
            {data && (
              <>
                {mode === 'room' ? (
                  <>
                    <Switch icon="circleEmpty" text="Geräten" onClick={() => setMode('device')} />
                    <RoomManagement
                      addRoom={addRoom}
                      updateRoomName={updateRoomName}
                      reorderRooms={reorderRooms}
                      deleteRoom={deleteRoom}
                      rooms={data.rooms}
                    />
                  </>
                ) : (
                  <>
                    <Switch icon="circleFull" text="Räumen" onClick={() => setMode('room')} />
                    <DeviceManagement
                      updateDeviceName={updateDeviceName}
                      deleteDevice={deleteDevice}
                      reorderDevices={reorderDevices}
                      devices={data.devices}
                    />
                  </>
                )}
              </>
            )}
          </Dialog>
        </>
      )}
    </Background>
  )
}

export default Home
