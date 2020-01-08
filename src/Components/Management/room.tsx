import React, { FC, Fragment, useContext } from 'react'
import { Text, ResponsiveContext } from 'grommet'

// Types
import { TRoom } from '../../Types'

// const
import { DatabaseContext } from '../../Contexts'

// Atoms
import { SColumn, SRow, SNameInput } from '../../Atoms/styled'
import IconButton from '../../Atoms/iconButton'

// ===============================================
const RoomManagement: FC = () => {
  const { rooms, renameRoom, deleteRoom } = useContext(DatabaseContext)

  const onRenameRoom = (event: any) => {
    const oldName = event.target.placeholder
    const newName = event.target.value

    if (event.key === 'Enter' && newName !== '') {
      event.target.placeholder = newName
      event.target.value = ''
      renameRoom(oldName, newName)
    }
  }

  // ===============================================
  return (
    <ResponsiveContext.Consumer>
      {size => {
        const isMobile = size.includes('small')

        return (
          <Fragment>
            <SColumn margin="1.5rem 0 0">
              {rooms.map((room: TRoom, index: number) => (
                <SRow key={'RoomManagement-' + index} margin="0 0 1rem">
                  <SNameInput
                    type="text"
                    fontSize={isMobile ? '0.9em' : '1.2em'}
                    placeholder={room.name}
                    onKeyPress={onRenameRoom}
                  />
                  <Text
                    size={isMobile ? '0.5em' : '0.65em'}
                    color="medium"
                    textAlign="end"
                    style={{ width: '40%' }}
                  >
                    {'Geräte: ' + room.devices.length}
                  </Text>
                  <IconButton iconType="minus" onClick={() => deleteRoom(index)} />
                </SRow>
              ))}
            </SColumn>
          </Fragment>
        )
      }}
    </ResponsiveContext.Consumer>
  )
}

export default RoomManagement
