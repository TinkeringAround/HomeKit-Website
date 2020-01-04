import React, { Fragment, useState, useContext, FC } from 'react'
import firebase from 'firebase'
import { Box, ResponsiveContext } from 'grommet'

// Context
import { DatabaseContext } from '../../Contexts'

// Atoms
import IconButton from '../../Atoms/iconButton'

// Components
import Dialog from '../Dialog'
import RoomManagement from '../Management/room'
import DeviceManagement from '../Management/device'
import Switch from '../Switch'
import Signout from '../Signout'

// ===============================================
const Navigation: FC = () => {
  const {
    reload,
    rooms,
    addRoom,
    deleteRoom,
    renameRoom,
    devices,
    deleteDevice,
    renameDevice
  } = useContext(DatabaseContext)
  const [open, setOpen] = useState<boolean>(false)
  const [mode, setMode] = useState<'room' | 'device'>('room')

  return (
    <ResponsiveContext.Consumer>
      {size => {
        const isMobile = size.includes('small')
        const wrapperSize = (isMobile ? 40 : 50) + 'px'
        const top = isMobile ? 15 : 30
        const right = isMobile ? 20 : 40

        return (
          <Fragment>
            <Box direction="row" style={{ position: 'absolute', top: top, right: right }}>
              <IconButton iconType="reload" wrapper={wrapperSize} onClick={reload} />
              <IconButton iconType="settings" wrapper={wrapperSize} onClick={() => setOpen(true)} />
            </Box>

            {/* Dialog */}
            <Dialog open={open} closeDialog={() => setOpen(false)}>
              {mode === 'room' ? (
                <>
                  <Signout onClick={() => firebase.auth().signOut()} />
                  <Switch icon="circleEmpty" text="Geräten" onClick={() => setMode('device')} />
                  <RoomManagement
                    addRoom={addRoom}
                    renameRoom={renameRoom}
                    deleteRoom={deleteRoom}
                    rooms={rooms}
                  />
                </>
              ) : (
                <>
                  <Signout onClick={() => firebase.auth().signOut()} />
                  <Switch icon="circleFull" text="Räumen" onClick={() => setMode('room')} />
                  <DeviceManagement
                    deleteDevice={deleteDevice}
                    renameDevice={renameDevice}
                    devices={devices}
                  />
                </>
              )}
            </Dialog>
          </Fragment>
        )
      }}
    </ResponsiveContext.Consumer>
  )
}

export default Navigation
