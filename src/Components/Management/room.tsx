import React, { FC } from 'react'
import { Text, Heading, ResponsiveContext } from 'grommet'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'

// Types
import { TRoom } from '../../Types'

// Atoms
import { Input, Column, SRow, NameInput } from '../../Atoms/styled'

// ===============================================
interface Props {
  rooms: Array<TRoom>
  addRoom: any
  renameRoom: (old: string, name: string) => void
  deleteRoom: (index: number) => void
}

// ===============================================
const RoomManagement: FC<Props> = ({ rooms, addRoom, renameRoom, deleteRoom }) => {
  const onDragEnd = (result: DropResult) => {
    if (rooms.length === 0) deleteRoom(result.source.index)
    else {
      if (!result.destination) {
        deleteRoom(result.source.index)
      }
    }
  }

  const onRoomNameChanged = (event: any) => {
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
          <>
            <Heading level="3" size="2em" color="headingInactive" margin="50px 0px 10px 0px">
              Räume
            </Heading>
            <Input type="text" placeholder="Raum hinzufügen..." onKeyPress={addRoom} />
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="Column">
                {provided => (
                  <Column {...provided.droppableProps} ref={provided.innerRef}>
                    {rooms.map((room: TRoom, index: number) => (
                      <Draggable
                        key={'DraggableRoom-' + index}
                        draggableId={room.name}
                        index={index}
                      >
                        {provided => (
                          <SRow
                            margin="0px 0px 10px 0px"
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <NameInput
                              type="text"
                              fontSize={isMobile ? '0.9em' : '1.2em'}
                              placeholder={room.name}
                              onKeyPress={onRoomNameChanged}
                            />
                            <Text
                              size={isMobile ? '0.5em' : '0.65em'}
                              color="iconInactive"
                              textAlign="end"
                            >
                              {'Devices: ' + room.devices.length}
                            </Text>
                          </SRow>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Column>
                )}
              </Droppable>
            </DragDropContext>
          </>
        )
      }}
    </ResponsiveContext.Consumer>
  )
}

export default RoomManagement
