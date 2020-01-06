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
        const position = '1rem'

        return (
          <Fragment>
            <Box direction="row" style={{ position: 'absolute', top: position, right: position }}>
              <IconButton
                iconType="reload"
                onClick={() => reload(false)}
                tooltip={!isMobile ? 'Neu Laden' : null}
              />
              <IconButton
                iconType="settings"
                onClick={() => setOpen(true)}
                tooltip={!isMobile ? 'Einstellungen' : null}
              />
              <IconButton
                iconType="signout"
                onClick={() => firebase.auth().signOut()}
                tooltip={!isMobile ? 'Abmelden' : null}
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
                      isMobile ? (tab === mode ? '2.5rem' : '1rem') : tab === mode ? '3rem' : '1rem'
                    }
                    color="medium"
                    margin="0 .75rem 0 0"
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
