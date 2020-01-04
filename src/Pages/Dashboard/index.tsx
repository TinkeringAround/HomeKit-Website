import React, { FC, useState, useEffect, useCallback } from 'react'
import { Box } from 'grommet'
import firebase from 'firebase'
import { CircleSpinner } from 'react-spinners-kit'

// Types
import { TRoom, TDevice, TDatabase, TVariable } from '../../Types'

// Theme
import { theme } from '../../Styles'

// Context
import { DatabaseContext } from '../../Contexts'

// Custom Components
import Room from '../../Components/Room'
import Navigation from '../../Components/Navigation/'

// ===============================================
const Dashboard: FC = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<TDatabase>()

  // ===============================================
  const reload = useCallback(() => {
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
              var values: Array<TVariable> = []
              Object.keys(tmpDatabase.devices[key].values).forEach(deviceKey => {
                values = [
                  ...values,
                  {
                    variable: deviceKey,
                    value: tmpDatabase.devices[key].values[deviceKey]
                  }
                ]
              })

              devices = [
                ...devices,
                {
                  id: key,
                  name: tmpDatabase.devices[key].name,
                  lastUpdated: tmpDatabase.devices[key].lastUpdated,
                  type: tmpDatabase.devices[key].type,
                  battery: tmpDatabase.devices[key].battery,
                  values: values
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
  }, [])

  // #region Rooms
  const updateRooms = useCallback(
    (newRooms: Array<TRoom>) => {
      if (data) {
        var updates: any = {}
        newRooms.forEach(room => {
          updates['rooms/' + room.name] = { devices: room.devices }
        })
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
    },
    [data]
  )

  const renameRoom = useCallback(
    (oldName: string, newName: string) => {
      if (data) {
        const index = data.rooms.findIndex((room: TRoom) => room.name === oldName)
        if (index >= 0) {
          var newRooms = Array.from(data.rooms)
          newRooms[index].name = newName
          updateRooms(newRooms)
        }
      }
    },
    [data, updateRooms]
  )

  const updateRoomDevices = useCallback(
    (index: number, newDevices: Array<string>) => {
      if (data) {
        const newRooms = Array.from(data.rooms)
        newRooms[index].devices = newDevices
        updateRooms(newRooms)
      }
    },
    [data, updateRooms]
  )

  const addRoom = useCallback(
    (event: any) => {
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
    },
    [data, updateRooms]
  )

  const deleteRoom = useCallback(
    (index: number) => {
      if (data) {
        const newRooms = Array.from(data.rooms)
        newRooms.splice(index, 1)
        updateRooms(newRooms)
      }
    },
    [data, updateRooms]
  )
  // #endregion

  // #region Devices
  const updateDevices = useCallback(
    (newDevices: Array<TDevice>) => {
      if (data) {
        var updates: any = {}
        newDevices.forEach(device => {
          var values = {}
          device.values.forEach((variable: TVariable) => {
            values = {
              ...values,
              [variable.variable]: variable.value
            }
          })

          updates['devices/' + device.id] = {
            name: device.name,
            lastUpdated: device.lastUpdated,
            battery: device.battery,
            type: device.type,
            values: values
          }
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
    },
    [data]
  )

  const renameDevice = useCallback(
    (oldName: string, newName: string) => {
      if (data) {
        const index = data.devices.findIndex((device: TDevice) => device.name === oldName)
        if (index >= 0) {
          var newDevices = Array.from(data.devices)
          newDevices[index].name = newName
          updateDevices(newDevices)
        }
      }
    },
    [data, updateDevices]
  )

  const deleteDevice = useCallback(
    (index: number) => {
      if (data) {
        const newDevices = Array.from(data.devices)
        newDevices.splice(index, 1)
        updateDevices(newDevices)
      }
    },
    [data, updateDevices]
  )
  // #endregion

  useEffect(() => {
    if (!data) reload()
  }, [data, reload])

  useEffect(() => {
    if (loading && data) {
      console.log('Data: ', data)
      setLoading(false)
    }
  }, [loading, data])

  // ===============================================
  return (
    <Box
      height="100%"
      width="100%"
      justify={loading ? 'center' : 'end'}
      align={loading ? 'center' : 'start'}
    >
      {loading && <CircleSpinner size={150} color={theme.global.colors['darkYellow']} />}

      {!loading && data && (
        <DatabaseContext.Provider
          value={{
            reload: reload,

            // Rooms
            rooms: data.rooms,
            addRoom: addRoom,
            deleteRoom: deleteRoom,
            renameRoom: renameRoom,

            // Devices
            devices: data.devices,
            deleteDevice: deleteDevice,
            renameDevice: renameDevice
          }}
        >
          <Navigation />
          <Box width="100%" height="90%" direction="row" wrap={false} style={{ overflowX: 'auto' }}>
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
        </DatabaseContext.Provider>
      )}
    </Box>
  )
}

export default Dashboard
