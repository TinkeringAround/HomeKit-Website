import React, { FC, useState, useEffect, useCallback } from 'react'
import { Box, ResponsiveContext } from 'grommet'
import firebase from 'firebase'
import { CircleSpinner } from 'react-spinners-kit'

// Types
import { TRoom, TDevice, TVariable } from '../../Types'

// Styles
import { colors } from '../../Styles'

// Context
import { DatabaseContext } from '../../Contexts'

// Components
import Room from '../../Components/Room'
import Navigation from '../../Components/Navigation/'
import DeviceDialog from '../../Components/Dialog/devices'

// ===============================================
const Dashboard: FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [rooms, setRooms] = useState<Array<TRoom> | null>(null)
  const [devices, setDevices] = useState<Array<TDevice> | null>(null)
  const [selectedRoom, setSelectedRoom] = useState<TRoom | null>(null)

  // ===============================================
  const reload = useCallback((silent: boolean = true) => {
    if (!silent) setLoading(true)

    firebase
      .database()
      .ref('/')
      .once('value')
      .then(snapshot => {
        if (snapshot.hasChildren()) {
          const tmpDatabase = snapshot.val()
          var rooms: Array<TRoom> = []
          var devices: Array<TDevice> = []

          // Rooms
          if (tmpDatabase.hasOwnProperty('rooms')) {
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

          // Devices
          if (tmpDatabase.hasOwnProperty('devices')) {
            const deviceKeys = Object.keys(tmpDatabase.devices)
            deviceKeys.forEach(key => {
              var values: Array<TVariable> = []
              Object.keys(tmpDatabase.devices[key].values).forEach(deviceKey => {
                // @ts-ignore
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

          console.log('New Database Update: ', {
            rooms: rooms,
            devices: devices
          })

          if (!silent) setTimeout(() => setLoading(false), 1000)
          setRooms(rooms)
          setDevices(devices)
        }
      })
  }, [])

  // #region Rooms
  const updateRooms = useCallback(
    (newRooms: Array<TRoom>) => {
      if (rooms) {
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
              .then(() => setRooms(newRooms))
          })
      }
    },
    [rooms]
  )

  const renameRoom = useCallback(
    (oldName: string, newName: string) => {
      if (rooms) {
        const index = rooms.findIndex((room: TRoom) => room.name === oldName)
        if (index >= 0) {
          var newRooms = Array.from(rooms)
          newRooms[index].name = newName
          updateRooms(newRooms)
        }
      }
    },
    [rooms, updateRooms]
  )

  const updateRoomDevices = useCallback(
    (index: number, newDevices: Array<string>) => {
      if (rooms) {
        const newRooms = Array.from(rooms)
        newRooms[index].devices = newDevices

        updateRooms(newRooms)
      }
    },
    [rooms, updateRooms]
  )

  const addRoom = useCallback(
    (event: any) => {
      if (rooms && event && event.key === 'Enter') {
        if (event.target.value !== '') {
          const name = event.target.value
          event.target.value = ''
          updateRooms([
            ...rooms,
            {
              name: name,
              devices: []
            }
          ])
        }
      }
    },
    [rooms, updateRooms]
  )

  const deleteRoom = useCallback(
    (index: number) => {
      if (rooms) {
        const newRooms = Array.from(rooms)
        newRooms.splice(index, 1)
        updateRooms(newRooms)
      }
    },
    [rooms, updateRooms]
  )
  // #endregion

  // #region Devices
  const updateDevices = useCallback(
    (newDevices: Array<TDevice>) => {
      if (devices) {
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
              .then(() => setDevices(newDevices))
          })
      }
    },
    [devices, setDevices]
  )

  const renameDevice = useCallback(
    (oldName: string, newName: string) => {
      if (devices) {
        const index = devices.findIndex((device: TDevice) => device.name === oldName)
        if (index >= 0) {
          var newDevices = Array.from(devices)
          newDevices[index].name = newName
          updateDevices(newDevices)
        }
      }
    },
    [devices, updateDevices]
  )

  const deleteDevice = useCallback(
    (index: number) => {
      if (devices) {
        const newDevices = Array.from(devices)
        newDevices.splice(index, 1)
        updateDevices(newDevices)
      }
    },
    [devices, updateDevices]
  )
  // #endregion

  useEffect(() => {
    if (!rooms && !devices) reload(false)
  }, [rooms, devices, reload])

  // ===============================================
  return (
    <ResponsiveContext.Consumer>
      {size => {
        const isMobile = size.includes('small')

        return (
          <Box height="100%" width="100%" justify="end">
            <DatabaseContext.Provider
              value={{
                reload: reload,

                // Rooms
                rooms: rooms ? rooms : [],
                addRoom: addRoom,
                deleteRoom: deleteRoom,
                renameRoom: renameRoom,

                // Devices
                devices: devices ? devices : [],
                deleteDevice: deleteDevice,
                renameDevice: renameDevice
              }}
            >
              <Navigation />
              <Box
                width="100%"
                height="90%"
                direction="row"
                wrap={false}
                style={{ overflowX: 'auto' }}
              >
                {!loading &&
                  rooms &&
                  devices &&
                  rooms.map((room: TRoom, index: number) => (
                    <Room
                      key={'Room-' + index + '-' + Date.now().toString()}
                      room={room}
                      selectRoom={() => setSelectedRoom(room)}
                    />
                  ))}
                {!loading && rooms && devices && <Room room={null} selectRoom={null} />}

                {loading && (
                  <Box height="100%" width="100%" justify="center" align="center">
                    <CircleSpinner size={isMobile ? 75 : 100} color={colors['yellow']} />
                  </Box>
                )}
              </Box>

              {/* Dialog */}
              <DeviceDialog
                open={selectedRoom !== null}
                close={() => setSelectedRoom(null)}
                room={selectedRoom}
                updateRoomDevices={updateRoomDevices}
              />
            </DatabaseContext.Provider>
          </Box>
        )
      }}
    </ResponsiveContext.Consumer>
  )
}

export default Dashboard
