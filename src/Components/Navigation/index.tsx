import React, { Fragment, useState, useContext, FC } from 'react'
import firebase from 'firebase'
import { Box, ResponsiveContext, Heading } from 'grommet'

// Types
import { TTab } from '../../Types'

// Context
import { DatabaseContext } from '../../Contexts'

// Atoms
import IconButton from '../../Atoms/iconButton'

// Components
import Dialog from '../Dialog'
import RoomManagement from '../Management/room'
import DeviceManagement from '../Management/device'

// Consts
const tabs: Array<TTab> = ['Räume', 'Geräte']

// ===============================================
const Navigation: FC = () => {
  const { reload } = useContext(DatabaseContext)
  const [open, setOpen] = useState<boolean>(false)
  const [mode, setMode] = useState<TTab>('Räume')

  return (
    <ResponsiveContext.Consumer>
      {size => {
        const isMobile = size.includes('small')
        const wrapperSize = (isMobile ? 40 : 50) + 'px'
        const position = '1rem'

        return (
          <Fragment>
            <Box direction="row" style={{ position: 'absolute', top: position, right: position }}>
              <IconButton iconType="reload" wrapper={wrapperSize} onClick={() => reload(false)} />
              <IconButton iconType="settings" wrapper={wrapperSize} onClick={() => setOpen(true)} />
              <IconButton
                iconType="signout"
                wrapper={wrapperSize}
                onClick={() => firebase.auth().signOut()}
              />
            </Box>

            {/* Dialog */}
            <Dialog open={open} closeDialog={() => setOpen(false)}>
              {/* Heading */}
              <Box width="100%" direction="row" align="baseline" margin={{ bottom: '1rem' }}>
                {tabs.map((tab: TTab) => (
                  <Heading
                    key={'Tab-' + tab}
                    level="3"
                    size={
                      isMobile ? (tab === mode ? '2rem' : '.75rem') : tab === mode ? '3rem' : '1rem'
                    }
                    color="headingInactive"
                    margin="0 .5rem 0 0"
                    style={{ cursor: 'pointer' }}
                    onClick={() => setMode(tab)}
                  >
                    {tab}
                  </Heading>
                ))}
              </Box>

              {/* Content */}
              {mode === 'Räume' && <RoomManagement />}
              {mode === 'Geräte' && <DeviceManagement />}
            </Dialog>
          </Fragment>
        )
      }}
    </ResponsiveContext.Consumer>
  )
}

export default Navigation
