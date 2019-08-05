import React, { FC } from 'react'
import { Text, Heading, TextInput } from 'grommet'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'

// Types
import { TRoom } from '../../Types'

// Custom Components
import { Input, Column, Container, NameInput } from './components'

//----------------------------------------------
interface Props {
  rooms: Array<TRoom>
  addRoom: any
  updateRoomName: any
  deleteRoom: any
}

const RoomManagement: FC<Props> = ({ rooms, addRoom, updateRoomName, deleteRoom }) => {
  const onDragEnd = (result: DropResult) => {
    console.log(result)
    if (!result.destination) {
      deleteRoom(result.source.index)
    } else {
      // reorder rooms
    }
  }

  const onRoomNameChanged = (event: any) => {
    const oldName = event.target.placeholder
    const newName = event.target.value
    if (event.key === 'Enter' && newName !== '') {
      event.target.placeholder = newName
      event.target.value = ''
      updateRoomName(oldName, newName)
    }
  }

  return (
    <>
      <Heading level="3" size="large" color="headingInactive" margin="50px 0px 0px 0px">
        Räume
      </Heading>
      <Input type="text" placeholder="Raum hinzufügen..." onKeyPress={addRoom} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="Column">
          {provided => (
            <Column {...provided.droppableProps} ref={provided.innerRef}>
              {rooms.map((room: TRoom, index: number) => (
                <Draggable key={'DraggableRoom-' + index} draggableId={room.name} index={index}>
                  {provided => (
                    <Container
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <NameInput placeholder={room.name} onKeyPress={onRoomNameChanged} />
                      <Text size="small" color="iconInactive">
                        {room.devices.length + ' Devices angeschlossen'}
                      </Text>
                    </Container>
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
}

export default RoomManagement
